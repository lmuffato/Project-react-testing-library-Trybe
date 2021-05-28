// import { render } from '@testing-library/react';
// import { getByText } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
// Ajuda do Murilo Gonçalvez;
const favoritePokemons = pokemons.reduce(
  (acc, current) => ({ ...acc, [current.id]: false }), {},
);

describe('testando component pokedex', () => {
  test('testando se contem um h2 com o texto correto', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    const h2 = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(h2).toBeInTheDocument();
  });
  test('testando se apos clicar no botao aparece o pokemon', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    const button = getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      const result = getByText(pokemon.name);
      expect(result).toBeInTheDocument();
      userEvent.click(button);
    });
    expect(getByText(pokemons[0].name)).toBeInTheDocument();
  });
  test('testando filtros', () => {
    const { getByRole, queryByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    const button = getByRole('button', { name: 'Electric' });
    expect(button).toBeInTheDocument();
    const electric = pokemons.filter(({ type }) => type === 'Electric');
    electric.forEach((pokemon) => {
      expect(queryByText(pokemon.name)).toBeInTheDocument();
    });
  });
  test('testando filtros', () => {
    const { getByRole, queryByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    const button = getByRole('button', { name: 'All' });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(queryByText(pokemons[0].name)).toBeInTheDocument();
  });
  test('Se é criado um botão de tipo dinamicamente', () => {
    const { queryByText, getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    const pokeType = queryByText('Poison');
    expect(pokeType).toBeInTheDocument();
    const pokeTestId = getAllByTestId('pokemon-type-button');
    expect(pokeTestId[1]).toBeInTheDocument();
  });
});
