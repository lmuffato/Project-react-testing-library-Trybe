import React from 'react';
import FavoritePokemons from "../components/FavoritePokemons";
import { render, screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';

describe('tests `FavoritePokemons` component ', () => {
  test('shows `No favorite pokemon found` if dont have any favorite pokemon', () => {
    renderWithRouter((<FavoritePokemons />));
    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });
})