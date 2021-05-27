import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Requirement 3 - testing the <FavoritePokemosn/> component', () => {
  it('Check if it contains the information "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeDefined();
  });
});
