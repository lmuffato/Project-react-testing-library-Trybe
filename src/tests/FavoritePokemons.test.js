import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('have no favorite Pokémons', () => {
  it('text No favorite pokemons Found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFound = getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
});
