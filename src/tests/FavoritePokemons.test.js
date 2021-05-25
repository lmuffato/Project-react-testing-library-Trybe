import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

test('if no favorite pokémon, show message', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const notFound = getByText(/No Favorite Pokemon found/i);
  expect(notFound).toBeInTheDocument();
});

test('it is shown all the favorite pokémon cards', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const favorite = [pokemons[0]];
  renderWithRouter(<FavoritePokemons pokemons={ favorite } />);
  expect(getByText('Pikachu')).toBeInTheDocument();
});

test('it is shown none pokémon cards if not favorite', () => {
  const { queryByText } = renderWithRouter(<FavoritePokemons />);
  const favorite = [];
  renderWithRouter(<FavoritePokemons pokemons={ favorite } />);
  expect(queryByText('Pikachu')).not.toBeInTheDocument();
});
