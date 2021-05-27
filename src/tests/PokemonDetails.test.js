import React from 'react';
// import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const moreDetails = 'More details';
const type = 'Electric';

test('testa se informações detalhadas são mostradas', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const selectPikachu = getByRole('button', {
    name: type,
  });
  const selectDetails = getByRole('link', {
    name: moreDetails,
  });
  userEvent.click(selectPikachu);
  userEvent.click(selectDetails);
  const pikachu = getByText('Pikachu Details');
  expect(pikachu).toBeInTheDocument();
  const h2Summary = getByRole('heading', {
    name: /summary/i,
    level: 2,
  });
  expect(pikachu).toBeInTheDocument();
  expect(h2Summary).toBeInTheDocument();
  const summary = getByText('This intelligent '
  + 'Pokémon roasts hard berries with electricity to make them tender enough to eat.');
  expect(summary).toBeInTheDocument();
});

test('testa se há seção com os mapas contendo as localizações', () => {
  const { getByRole, getByAltText } = renderWithRouter(<App />);
  const selectAlakazam = getByRole('button', {
    name: 'Psychic',
  });
  const selectDetails = getByRole('link', {
    name: moreDetails,
  });
  userEvent.click(selectAlakazam);
  userEvent.click(selectDetails);
  const h2Location = getByRole('heading', {
    name: 'Game Locations of Alakazam',
    level: 2,
  });
  expect(h2Location).toBeInTheDocument();
  const pokemonLocation = getByAltText('Alakazam location');
  console.log(pokemonLocation);
  expect(pokemonLocation.src).toContain('https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png');
});

test('testa se pode favoritar um pokémon', () => {
  const { getByRole, getByLabelText } = renderWithRouter(<App />);
  const selectPikachu = getByRole('button', {
    name: type,
  });
  const selectDetails = getByRole('link', {
    name: moreDetails,
  });
  userEvent.click(selectPikachu);
  userEvent.click(selectDetails);
  const checkbox = getByRole('checkbox');
  const labelFavorite = getByLabelText('Pokémon favoritado?');
  userEvent.click(labelFavorite);
  expect(labelFavorite).toBeInTheDocument();
  expect(checkbox).toBeInTheDocument();
});
