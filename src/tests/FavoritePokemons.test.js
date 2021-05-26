import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';

describe('"Favorite Pokémons" page Tests', () => {
  test('Heading', () => {
    const { getByText, getByRole } = renderWithRouter(<FavoritePokemons />);
    const header = getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    });
    expect(header).toBeInTheDocument();
    const paragraph = getByText('No favorite pokemon found');
    expect(paragraph).toBeInTheDocument();
  });
});

// https://testing-library.com/docs/queries/about/ getByRole and getByText
