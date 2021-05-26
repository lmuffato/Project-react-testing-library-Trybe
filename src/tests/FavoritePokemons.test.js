import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('Testa se há pokemons favoritos e se aparece mensagem caso não tenha', () => {
  render(<FavoritePokemons />);
  const noFavorite = screen.getByText('No favorite pokemon found');
  expect(noFavorite).toBeInTheDocument();
});
