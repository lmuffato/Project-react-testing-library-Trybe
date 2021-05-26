import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('3 REQUIREMENT', () => {
  test('see the message No favorite Pokémon found on the screen', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFoundMessage = getByText(/No favorite pokemon found/i);
    expect(notFoundMessage).toBeInTheDocument();
  });
});
