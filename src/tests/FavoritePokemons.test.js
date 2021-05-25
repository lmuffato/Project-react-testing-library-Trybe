import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('test the component favorites Pokemons', () => {
  test('has the "Favorites Pokémons" text', () => {
    const { getByRole } = render(<FavoritePokemons />);
    const heading = getByRole('heading', {
      name: /favorite pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });
  test('has the "No favorite pokemon found" text', () => {
    const { getByText } = render(<FavoritePokemons />);
    const heading = getByText('No favorite pokemon found');
    expect(heading).toBeInTheDocument();
  });
});
