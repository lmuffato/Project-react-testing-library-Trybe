import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

test('renders Pokedex and execute all functions', () => {
  const { getByRole, getByText, getAllByRole, getAllByTestId } = render(
    <MemoryRouter>
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />
    </MemoryRouter>,
  );

  const heading = getByRole('heading', { name: 'Encountered pokémons' });
  expect(heading).toBeInTheDocument();

  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();

  const buttons = getAllByRole('button');
  const count = 9;
  expect(buttons.length).toBe(count);

  const nextBtn = getByRole('button', { name: 'Próximo pokémon' });
  userEvent.click(nextBtn);
  const charmander = getByText(/Charmander/i);
  expect(charmander).toBeInTheDocument();

  const allBtn = getByRole('button', { name: /All/i });
  userEvent.click(allBtn);
  expect(pikachu).toBeInTheDocument();
  expect(nextBtn.disabled).toBe(false);

  const bugBtn = getByRole('button', { name: /Bug/i });
  userEvent.click(bugBtn);
  const caterpie = getByText(/Caterpie/i);
  expect(caterpie).toBeInTheDocument();
  expect(nextBtn.disabled).toBe(true);

  const typebtns = getAllByTestId('pokemon-type-button');
  const typeArr = typebtns.map((button) => button.innerHTML);
  expect(typeArr).toEqual([
    'Electric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon',
  ]);
});
