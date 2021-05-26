import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Tests for FavoritePokemons', () => {
  it('Tests whether the text is contained No Favorite Pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const favorite = getByText('No favorite pokemon found');
    expect(favorite).toBeInTheDocument();
  });
});
