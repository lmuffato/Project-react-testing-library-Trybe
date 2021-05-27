import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';

describe('Test Favorite', () => {
  test('testing no favorite message', () => {
    const { getByRole } = renderWithRouter(<FavoritePokemons />);

    const favorite = getByRole('heading', {
      name: /favorite pokémons/i,
      level: 2,
    });

    expect(favorite).toBeInTheDocument();
  });

  test('testing no favorite found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const noFav = getByText(/no favorite pokemon found/i);

    expect(noFav).toBeInTheDocument();
  });

  // test('testing cards exhibited', () => {
  //   const { getByTestId } = renderWithRouter(<FavoritePokemons />);

  //   const favCard = getByTestId('favorite-cards');

  //   expect(favCard).toBeInTheDocument();
  // });
});
