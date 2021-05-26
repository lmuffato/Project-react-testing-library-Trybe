import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('test all screen application of the FavoritePokemons', () => {
  it('"No favorite pokemon" found msg screen,if a person has no favorite pokemon',
    () => {
      const { getByText } = renderWithRouter(<FavoritePokemons />);
      const notFavorite = getByText(/No favorite pokemon found/i);
      expect(notFavorite).toBeInTheDocument();
    });
});

describe('Check card favorite pokémon', () => {
  it('screen card favorites', () => {
    const { getByText } = renderWithRouter(<App />);
    const details = getByText('More details');
    userEvent.click(details);
    const checkbox = getByText('Pokémon favoritado?');
    userEvent.click(checkbox);
    const favorite = getByText('Favorite Pokémons');
    userEvent.click(favorite);
  });
  const cardPokemon = getByText('Average weight:');
  expect(cardPokemon).toBeInTheDocument();
});
