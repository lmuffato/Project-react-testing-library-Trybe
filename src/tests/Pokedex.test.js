import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('page contains an h2 heading with the text Encountered Pokémon',
  () => {
    const { getByRole } = renderWithRouter(<App />);
    const text = getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(text).toBeInTheDocument();
  });

test('page contains a button with Next Pokemon', () => {
  const { getByRole } = renderWithRouter(<App />);
  const btnText = getByRole('button', {
    name: /Próximo pokémon/i,
  });
  expect(btnText).toBeInTheDocument();
});

test('next Pokémon on the list should be shown', () => {
  const { getByRole } = renderWithRouter(<App />);
  const btnText = getByRole('button', {
    name: /Próximo pokémon/i,
  });

  userEvent.click(btnText);
  expect(btnText).toBeInTheDocument();
});

test('only one Pokémon is shown at a time', () => {
  const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
  const pokemon = getByTestId('pokemon-name');
  const allPokemons = getAllByTestId('pokemon-name');
  expect(pokemon).toBeInTheDocument();
  expect(allPokemons).toHaveLength(1);
});

test('a Pokédex has the filter buttons', () => {
  const { getByText } = renderWithRouter(<App />);
  const filterBtn = getByText(/fire/i);
  const pokemon = getByText(/fire/i);
  userEvent.click(filterBtn);
  expect(pokemon).toBeInTheDocument();
});

test('the Pokédex contains a button to reset the filter', () => {
  const { getByText } = renderWithRouter(<App />);
  const filterAll = getByText(/all/i);
  const pikachu = getByText(/pikachu/i);
  userEvent.click(filterAll);
  expect(pikachu).toBeInTheDocument();
});

test('a filter button for each type of Pokémon', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const allBtns = getAllByTestId('pokemon-type-button');
  const btnLength = 7;
  expect(allBtns).toHaveLength(btnLength);
});
