import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('tests FavoritePokemons.js', () => {
  test('verifies if the page contains the headinf "Favorite pokémons"', () => {
    const { getByRole } = renderWithRouter(<FavoritePokemons />);
    const expectedHeading = getByRole('heading', {
      name: 'Favorite pokémons',
      level: 2,
    });
    expect(expectedHeading).toBeInTheDocument();
  });

  test('verifies if the message "No favorite pokemon found appears"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const expectedMessage = getByText(/No favorite pokemon found/);
    expect(expectedMessage).toBeInTheDocument();
  });
});
