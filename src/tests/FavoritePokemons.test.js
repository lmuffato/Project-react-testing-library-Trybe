import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('FavoritePokemons.js tests', () => {
  it('verify "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const noFavorite = getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });
});
