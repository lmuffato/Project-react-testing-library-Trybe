import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Test if FavoritePokemon component', () => {
  test('renders No favorite pokemon found, if the user havent favorite pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noPokemonsMessage = getByText(/no favorite pokemon found/i);
    expect(noPokemonsMessage).toBeInTheDocument();
  });
});
