import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Pokedex } from '../components';
import data from '../data';

describe('tests the pokedex component', () => {
  const pokemonsFavorites = {
    4: false,
    10: false,
    23: false,
    25: true,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };
  const pokemons = data;

  test('tests whether the heading is rendered with the correct text', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ pokemonsFavorites } />
      </MemoryRouter>,
    );
    const headingTwo = getByRole('heading',
      { name: 'Encountered pokémons', level: 2 });
    expect(headingTwo).toBeInTheDocument();
  });
});
