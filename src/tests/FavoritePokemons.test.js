import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import data from '../data';

describe('with render correct results to favorites pokemons', () => {
  test('whether the correct text is displayed when there is no favorite pokemon', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FavoritePokemons pokemons={ [] } />
      </MemoryRouter>,
    );
    const notFoundPokemon = getByText(/No favorite pokemon found/i);
    expect(notFoundPokemon).toBeInTheDocument();
  });
  test('all favorites pokemons with render', () => {
    const pokemons = data;
    const { getAllByTestId } = render(
      <MemoryRouter>
        <FavoritePokemons pokemons={ pokemons } />
      </MemoryRouter>,
    );
    const pokemonsName = getAllByTestId('pokemon-name');
    expect(pokemonsName).toHaveLength(pokemons.length);
  });
  test('test if no Pokémon card is displayed, if it is not favored.', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <FavoritePokemons pokemons={ [] } />
      </MemoryRouter>,
    );
    let pokemonName;
    try {
      pokemonName = getAllByTestId('pokemon-name');
    } catch (e) {
      pokemonName = undefined;
    }
    expect(pokemonName).toBe(undefined);
  });
});
