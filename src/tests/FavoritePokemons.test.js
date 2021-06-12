import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('test mesagem no favorite pokemon ', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/favorites');
  const noFavoriteMsg = screen.getByText('No favorite pokemon found');

  expect(noFavoriteMsg).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/pokemons/25');
  const input = screen.getByLabelText('Pokémon favoritado?');

  expect(input).toBeInTheDocument();
  userEvent.click(input);
  history.push('/favorites');

  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();
});
