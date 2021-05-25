import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('testes do componente Favorite Pokemons', () => {
  test('testes gerais da página de favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavoritesText = screen.getByText('No favorite pokemon found');
    expect(noFavoritesText).toBeInTheDocument();
  });
});
