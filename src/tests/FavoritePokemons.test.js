import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('test all screen application of the FavoritePokemons', () => {
  it('"No favorite pokemon" found msg screen,if a person has no favorite pokemon',
    () => {
      const { getByText } = renderWithRouter(<FavoritePokemons />);
      const notFavorite = getByText(/No favorite pokemon found/i);
      expect(notFavorite).toBeInTheDocument();
    });
});
