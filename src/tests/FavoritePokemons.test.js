import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Test \'Favorite Pokémons\'', () => {
  it('Test if \'Favorite Pokémons\' is rendered', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  });

  it('Test if \'Favorite Pokémons\' is rendered', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  });

  it('Test if \'Favorite Pokémons\' if no cards are rendered if no Pokemon is favorited',
    () => {
      const { getByText } = renderWithRouter(<FavoritePokemons />);
      expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
    });
});
