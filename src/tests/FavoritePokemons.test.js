import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Pokemons Favoritos', () => {
  it('sem favoritos exibe - No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorite = screen.getByText('No favorite pokemon found');

    expect(noFavorite).toBeInTheDocument();
  });
});
