import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render, screen } from '@testing-library/react';
// import Pokedex from '../components/Pokedex';
// import { findAllByTestId } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const nextPokemonButton = 'Próximo pokémon';

test('Verifica se aparece h2 com texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const h2Text = getByRole('heading', {
    name: /Encountered pokémons/i,
  });
  expect(h2Text).toBeInTheDocument();
});

test('Verifica se botão próximo pokemon existe', async () => {
  const { getByText } = renderWithRouter(<App />);
  const nextButton = getByText(nextPokemonButton);
  expect(nextButton).toBeDefined();
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

test('Verifica se filtro de pokemon único desabilita o botão próximo', async () => {
  const { getByRole } = renderWithRouter(<App />);
  const buttonAll = getByRole('button', {
    name: 'Bug',
  });
  userEvent.click(buttonAll);
  const buttonNext = getByRole('button', {
    name: nextPokemonButton,
  });
  expect(buttonNext).toBeDisabled();
});

test('Verifica se All habilita o botão próximo', async () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const buttonAll = getByRole('button', {
    name: 'All',
  });
  const nextPokemon = getByText('Pikachu');
  userEvent.click(buttonAll);
  const buttonNext = getByRole('button', {
    name: nextPokemonButton,
  });
  expect(buttonNext).toBeEnabled();
  expect(nextPokemon).toBeInTheDocument();
});

// forma de fazer encontrada no teste do requisito 4 do projeto frontend-store
// https://github.com/tryber/sd-010-a-project-frontend-online-store#4-liste-as-categorias-de-produtos-dispon%C3%ADveis-via-api-na-p%C3%A1gina-principal
test(`Exibe as categorias retornadas pela API na página de listagem de
      produtos`, () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const totalTypePokemons = 7;
  expect(getAllByTestId('pokemon-type-button').length).toEqual(totalTypePokemons);
});
