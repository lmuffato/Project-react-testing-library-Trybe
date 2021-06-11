import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Requirement 3', () => {
  test('If the message with the text "No favorite pokemon found" is rendered.', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons />,
    );
    const noFavorite = getByText(/no favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
});
