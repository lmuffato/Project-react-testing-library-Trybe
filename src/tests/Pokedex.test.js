import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

test('page renders a h2 heading with text `Encountered pokémons`', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  history.push('/');
  const encounteredPkms = getByRole('heading', {
    name: 'Encountered pokémons',
    level: 2,
  });
  expect(encounteredPkms).toBeInTheDocument();
});

test('click on button `next-pokémon` renders the next pokémon of the list'
 + ' and only one Pokémon is shown each time', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/');

  userEvent.click(screen.getByTestId('next-pokemon'));
  expect(screen.getByText('Próximo pokémon')).toBeInTheDocument();

  const pkmName = screen.getByTestId('pokemon-name');
  expect(pkmName).toBeInTheDocument();
  const pokemonName = screen.getAllByTestId('pokemon-name');
  expect(pokemonName).toHaveLength(1);

  const pkmType = screen.getByTestId('pokemon-type');
  expect(pkmType).toBeInTheDocument();
  const pokemonType = screen.getAllByTestId('pokemon-type');
  expect(pokemonType).toHaveLength(1);

  const pkmWeight = screen.getByTestId('pokemon-weight');
  expect(pkmWeight).toBeInTheDocument();
  const pokemonWeight = screen.getAllByTestId('pokemon-weight');
  expect(pokemonWeight).toHaveLength(1);
});

test('pokédex has filter buttons', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/');

  const pkmListOfTypes = [...new Set(pokemons.map(({ type }) => type))];
  const buttons = screen.getAllByTestId('pokemon-type-button');
  expect(buttons).toHaveLength(pkmListOfTypes.length);

  pkmListOfTypes.forEach((type, index) => {
    expect(buttons[index]).toHaveTextContent(type);
  });
});

test('pokédex has a button to reset filters', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/');

  const btnReset = getByRole('button', {
    name: /all/i,
  });
  expect(btnReset).toBeInTheDocument();
  userEvent.click(btnReset);
});
