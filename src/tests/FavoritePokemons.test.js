import React from 'react';
import FavoritePokemon from '../components/FavoritePokemons';
import renderWithRouter from './RenderWithRouter';

describe('Testa FavoritePokemons', () => {
  it('Testa se renderiza "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemon />);
    const notFavorite = getByText('No favorite pokemon found');
    expect(notFavorite).toBeInTheDocument();
  });
});
