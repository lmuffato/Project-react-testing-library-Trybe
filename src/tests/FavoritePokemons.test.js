import userEvent from '@testing-library/user-event';
import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Test 3.0', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const aboutText = getByText(/No favorite pokemon found/i);
  expect(aboutText).toBeInTheDocument();
});
test('Test 3.1', () => {
  const { getByText, getByAltText } = renderWithRouter(<App />);
  const infoPokemon = getByText(/More details/i);
  userEvent.click(infoPokemon);
  const isFavorited = getByText(/Pokémon favoritado?/i);
  userEvent.click(isFavorited);
  const markedPokemon = getByAltText(/is marked as favorite/i);
  expect(markedPokemon).toBeInTheDocument();
});
