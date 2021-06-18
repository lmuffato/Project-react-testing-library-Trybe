import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './RenderWithRouter.test';

test('Se as informações detalhadas são mostradas na tela', () => {
  const { getByText, getAllByRole,
    getByRole, getByLabelText } = renderWithRouter(<App />);

  const textButton = getByText(/more details/i);
  userEvent.click(textButton);

  const map1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
  const map2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
  const mapsPoke = getAllByRole('img');
  expect(mapsPoke[1].src).toBe(map1);
  expect(mapsPoke[1].alt).toBe('Pikachu location');
  expect(mapsPoke[2].src).toBe(map2);
  expect(mapsPoke[2].alt).toBe('Pikachu location');

  const namePoke = getByText('Game Locations of Pikachu');
  expect(namePoke).toBeInTheDocument();

  const summaryPoke = getByRole('heading', { name: /summary/i });
  expect(summaryPoke).toBeInTheDocument();

  const textSummary = 'This intelligent Pokémon roasts hard berries with '
  + 'electricity to make them tender enough to eat.';
  const testSummaryText = getByText(textSummary);
  expect(testSummaryText).toBeInTheDocument();

  const inputFavorite = getByLabelText('Pokémon favoritado?');
  expect(inputFavorite).toBeInTheDocument();

  const pokeHeading = getByRole('heading', { name: /pikachu details/i });
  expect(pokeHeading).toBeInTheDocument();
});
