import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render, screen } from '@testing-library/react';
// import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { findAllByTestId } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

test('Verifica se aparece h2 com texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const h2Text = getByRole('heading', {
    name: /Encountered pokémons/i,
  });
  expect(h2Text).toBeInTheDocument();
});

test('Verifica se botão próximo pokemon funciona', async () => {
  const { getByText } = renderWithRouter(<App />);
  const buttonNext = getByText('Próximo pokémon');
  expect(buttonNext).toBeDefined();
});

test('Verifica se botão próximo pokemon funciona', async () => {
  const { getByRole } = renderWithRouter(<App />);
  const buttonAll = getByRole('button', {
    name: 'All',
  });
  expect(buttonAll).toBeInTheDocument();
});

test('Verifica se botão próximo pokemon funciona', async () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const buttonNext = getByRole('button', {
    name: 'Próximo pokémon',
  });
  userEvent.click(buttonNext);
  const nextPokemon = getByText('Charmander');
  // const pokemonType = getByText('Fire');
  expect(nextPokemon).toBeInTheDocument();
  // expect(pokemonType).toBeInTheDocument();
});

test('Verifica se botão próximo pokemon funciona', async () => {
  // const { findAllByTestId } = renderWithRouter(<App />);
  const { searchButton } = findAllByTestId(() => {
    searchButton.getByTestId('pokemon-type-button');
    expect(searchButton).toBeInTheDocument();
  });
});

test('Verifica se filtro de pokemon único desabilita o botão próximo', async () => {
  const { getByRole } = renderWithRouter(<App />);
  const buttonAll = getByRole('button', {
    name: 'Bug',
  });
  userEvent.click(buttonAll);
  const buttonNext = getByRole('button', {
    name: 'Próximo pokémon',
  });
  expect(buttonNext).toBeDisabled();
});
