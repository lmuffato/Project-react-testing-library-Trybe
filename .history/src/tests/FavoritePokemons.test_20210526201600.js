import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../components/MemoryRouter';

describe('Renders FavoritePokemons', () => {
  test('Tests the: No favorite pokemons found ', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const messageFinder = getByText('No favorite pokemon found');

    expect(messageFinder).toBeInTheDocument();
  });
});
