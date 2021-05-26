import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('test <FavoritePokemons />', () => {
  it('test message when there are no favorite pokemon', () => {
    const { getByText } = renderWithRouter(
      <MemoryRouter>
        <FavoritePokemons pokemons={ [] } />
      </MemoryRouter>,
    );

    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
});
