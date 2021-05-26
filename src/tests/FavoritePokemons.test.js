import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Favorite Pokemons tests', () => {
  it('Test if Favorite pokemons heading is shown', () => {
    const { getByRole } = renderWithRouter(<FavoritePokemons />);
    const favoriteHeading = getByRole('heading', {
      name: /Favorite Pokémons/i,
    });
    expect(favoriteHeading).toBeInTheDocument();
  });
  it('Test if shows "No Favorite pokemon found" if theres any favorite pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const noFavoritePokemonFound = getByText('No favorite pokemon found');
    expect(noFavoritePokemonFound).toBeInTheDocument();
  });
  it('Test if shows favorite pokemons', () => {
    const pokemon = [{
      name: 'Charmander',
      type: 'fire',
      averageWeight: '{measurementUnit: "kg", value: "8.5"}',
      id: '4',
    }];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);
    const favoritePokemonFound = getByText('Charmander');
    expect(favoritePokemonFound).toBeInTheDocument();
  });
});
