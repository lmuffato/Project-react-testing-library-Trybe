import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

const isPokemonFavoriteById = () => {
  const obj = {};
  pokemons.forEach((pokemon) => {
    obj[pokemon.id] = false;
  });
  return obj;
};

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById() }
  />);

  const contain = screen.getByRole('heading',
    { level: 2, name: /Encountered pokémons/i });
  expect(contain).toBeInTheDocument();
});

test('O botão deve conter o texto Próximo pokémon', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById() }
  />);

  const contain = screen.getByRole('button', { name: /Próximo pokémon/i });
  expect(contain).toBeInTheDocument();
});

test('Verifica se exite botão All e se quando clicado renderiza Pikachu', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById() }
  />);

  const contain = screen.getByRole('button', { name: /All/i });
  expect(contain).toBeInTheDocument();
  fireEvent.click(contain);

  const namePokemon = screen.getByText(/pikachu/i);
  expect(namePokemon).toBeInTheDocument();
});

test('Verifica se exite botão All e se quando clicado renderiza Pikachu', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById() }
  />);

  const nameBtn = screen.getByRole('button', { name: /electric/i });
  expect(nameBtn).toBeInTheDocument();

  const contain = screen.getAllByTestId('pokemon-type-button');
  expect(contain[0]).toBeInTheDocument();
});
