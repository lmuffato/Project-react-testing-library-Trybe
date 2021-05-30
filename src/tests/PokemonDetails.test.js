import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={ history }>{ui}</Router>),
    history,
  };
}

test('Teste se existe um heading h2, summary, game location.', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText('More details'));
  expect(getByRole('heading', { name: /Pikachu Details/ })).toBeInTheDocument();

  const pokFavorited = getByText('Pokémon favoritado?');
  expect(pokFavorited).toBeInTheDocument();

  expect(getByRole('heading', { name: /Summary/ })).toBeInTheDocument();

  expect(getByRole('heading', { name: /Game Locations of Pikachu/ })).toBeInTheDocument();

  expect(getByText('This intelligent Pokémon roasts hard berries '
  + 'with electricity to make them tender enough to eat.')).toBeInTheDocument();
});

test('Teste se há uma seção com os mapas contendo as localizações do pokémon', () => {
  const { getAllByAltText, getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText('More details'));

  const imgMaps = getAllByAltText('Pikachu location');

  expect(imgMaps[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(imgMaps[1].src).toContain('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
});
