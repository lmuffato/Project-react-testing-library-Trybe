import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Se informações detalhadas são mostradas na tela', () => {
  const { getByText, getAllByRole,
    getByRole, getByLabelText } = renderWithRouter(<App />);
  const detailsBtn = getByText(/more details/i);
  userEvent.click(detailsBtn);
  const mapsPoke = getAllByRole('img');
  expect(mapsPoke[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(mapsPoke[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(mapsPoke[1].alt).toBe('Pikachu location');
  expect(mapsPoke[2].alt).toBe('Pikachu location');
  const namePoke = getByText('Game Locations of Pikachu');
  expect(namePoke).toBeInTheDocument();
  const summary = getByRole('heading', { level: 2, name: /summary/i });
  expect(summary).toBeInTheDocument();
  const textSummary = 'This intelligent Pokémon roasts hard berries with '
    + 'electricity to make them tender enough to eat.';
  const testSummary = getByText(textSummary);
  expect(testSummary).toBeInTheDocument();
  const inputFav = getByLabelText('Pokémon favoritado?');
  expect(inputFav).toBeInTheDocument();
  const heading = getByRole('heading', { name: /pikachu details/i });
  expect(heading).toBeInTheDocument();
});
