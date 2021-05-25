import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';

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
});
