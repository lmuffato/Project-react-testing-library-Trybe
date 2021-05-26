import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const btn = getByText(/More Details/i);

  fireEvent.click(btn);
  const poke = getByText('Pikachu Details');
  const summary = getByRole('heading', {
    level: 2,
    name: 'Summary',
  });
  const descricao = getByText(/This intelligent Pokémon roasts hard berries/i);
  expect(poke).toHaveTextContent('Pikachu Details');
  expect(btn).not.toBeInTheDocument();
  expect(summary).toBeInTheDocument();
  expect(descricao).toBeInTheDocument();
});

test('existe na página uma seção com os mapas', () => {
  const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);
  const btn = getByText(/More Details/i);
  fireEvent.click(btn);
  const gameLocation = getByRole('heading', {
    level: 2,
    name: /Game locations of Pikachu/i,
  });
  const pokeLocation = getAllByRole('img', {
    name: /Pikachu location/i,
  });
  expect(gameLocation).toBeInTheDocument();
  expect(pokeLocation.length).toBe(2);
  expect(pokeLocation[0]).toHaveAttribute('src',
    'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
});

test('usuário pode favoritar um pokémon através da página de detalhes', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const btn = getByText(/More Details/i);
  fireEvent.click(btn);
  const checkbox = getByRole('checkbox');
  fireEvent.click(checkbox);
  expect(checkbox).toBeTruthy();
  expect(getByText(/Pokémon favoritado/i)).toBeInTheDocument();
});
