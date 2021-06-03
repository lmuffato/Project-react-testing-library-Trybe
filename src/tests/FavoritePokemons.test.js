import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './RenderWithRouter';

describe('tests `FavoritePokemons` component ', () => {
  test('show `No favorite pokemon found` if dont have any favorite pokemon', () => {
    renderWithRouter((<FavoritePokemons />));
    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });
});
