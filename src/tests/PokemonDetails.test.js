import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Teste o componente <PokemonDetails.js />', () => {
  render(
    <MemoryRouter initialEntries={ ['/pokemons/25'] }>
      <App />
    </MemoryRouter>,
  );

  const pokeDetails = screen.getByRole('heading', { name: /Pikachu Details/i, level: 2 });
  expect(pokeDetails).toBeInTheDocument();
  const summary = screen.getByRole('heading', { name: /Summary/i, level: 2 });
  expect(summary).toBeInTheDocument();
  const locations = screen
    .getByRole('heading', { name: /Game locations of Pikachu/i, level: 2 });
  expect(locations).toBeInTheDocument();
  const sumText = screen
    .getByText(/This intelligent Pokémon roasts hard berries/i);
  expect(sumText).toBeInTheDocument();
  const locationImgs = screen.getAllByRole('img', { name: /Pikachu Location/i });
  expect(locationImgs[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  const favCheckbox = screen.getByRole('checkbox');
  expect(favCheckbox.parentNode.innerHTML)
    .toBe('Pokémon favoritado?<input type="checkbox" id="favorite">');
});
