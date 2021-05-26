import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('renders the favorites page', () => {
  it(`verify if is displayed the message "No favorite pokemon found",
    if the person doesn't have favorite pokemons`, () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavoritePokemon = getByText('No favorite pokemon found');

    expect(noFavoritePokemon).toBeInTheDocument();
  });

  it('verify if all pokemon cards are displayed', () => {
    const { getAllByTestId } = renderWithRouter(<FavoritePokemons
      pokemons={ pokemons }
    />);
    const favoritesPokemons = getAllByTestId('pokemon-name');

    expect(favoritesPokemons.length).toBe(pokemons.length);
  });

  it('verify if no card is rendered', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const noFavoritesPokemons = getByText('No favorite pokemon found');

    expect(noFavoritesPokemons).toBeInTheDocument();
  });
});
