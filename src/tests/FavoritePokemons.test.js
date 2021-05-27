import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('testing App components', () => {
  it('renders a reading with the text `about pokédex`', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const paragraph = getByText(/No favorite pokemon found/i, {
    });
    expect(paragraph).toBeInTheDocument();
  });
});
