import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './RenderWithRouter.test';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

// Ajuda de Lucas Paz, turma 10 - tribo A, na lógica de criar props para os pokemons favoritados
const favoritesPokes = () => {
  const objPoke = {};
  pokemons.forEach((poke) => {
    objPoke[poke.id] = false;
  });
  return objPoke;
};

test('Teste se h2 tem o texto Encountered pokémons', () => {
  const { getByText } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ favoritesPokes() }
  />);

  const textPokedex = getByText('Encountered pokémons');
  expect(textPokedex).toBeInTheDocument();
});

test('Teste se o próximo pokemon é mostrado ao clicar na tela', () => {
  const { getByRole, queryByText } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ favoritesPokes() }
  />);

  const btnNext = getByRole('button', { name: /próximo pokémon/i });
  expect(btnNext).toBeInTheDocument();
  pokemons.forEach((poke) => {
    expect(queryByText(poke.name)).toBeInTheDocument();
    fireEvent.click(btnNext);
  });
});

test('Se o primeiro pokemon é mostrado ao clicar no botão no último pokemon', () => {
  const { getByRole, queryByText } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ favoritesPokes() }
  />);
  const btnNext = getByRole('button', { name: /próximo pokémon/i });
  for (let index = 0; index < pokemons.length; index += 1) {
    queryByText(pokemons[index].name);
    fireEvent.click(btnNext);
  }
  expect(queryByText(pokemons[0].name)).toBeInTheDocument();
});

test('Se existe apenas um pokemon na tela', () => {
  const { getAllByTestId } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ favoritesPokes() }
  />);

  const pokeRender = getAllByTestId('pokemon-name');
  expect(pokeRender.length).toBe(1);
});

// Ajuda de Lucas Paz, turma 10 - tribo A
test('Se existe um botão para resetar o filtro', () => {
  const { getByText } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ favoritesPokes() }
  />);

  const btnReset = getByText('All');
  expect(btnReset).toBeInTheDocument();

  fireEvent.click(btnReset);
  const namePoke = getByText('Pikachu');
  expect(namePoke).toBeInTheDocument();
});

test('Se é criado um botão de tipo dinamicamente', () => {
  const { getByText, getAllByTestId } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ favoritesPokes() }
  />);

  const pokeType = getByText('Poison');
  expect(pokeType).toBeInTheDocument();

  const pokeTestId = getAllByTestId('pokemon-type-button');
  expect(pokeTestId[1]).toBeInTheDocument();
});
