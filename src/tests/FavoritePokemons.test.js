import React from 'react';
import renderWithRouter from './renderWithRouter.test';
import FavoritePokemons from '../components/FavoritePokemons';

describe('testing App components', () => {
  it('renders a reading with the text `about pokédex`', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const text = getByText(/No favorite pokemon found/i, {
    });
    expect(text).toBeInTheDocument();
  });
});
