import React from 'react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

import pokemons from '../data';

test('show the "Encountered pokémons" text', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  const pokedexHeader = screen.getByText('Encountered pokémons');

  expect(pokedexHeader).toBeInTheDocument();
});

test('test the nextPokemon button', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const proxPokemons = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });
  userEvent.click(proxPokemons);
  const charmander = screen.getByText('Charmander');
  expect(charmander).toBeInTheDocument();
});

test('show the first pokemon when click nextPokemon being in the last pokemon', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const proxPokemons = screen.getByRole('button', {
    name: /Próximo pokémon/i,
  });
  for (let i = 0; i < pokemons.length; i += 1) {
    userEvent.click(proxPokemons);
  }

  const pikachu = screen.getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
});

test('test the filter by element buttons', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const eletricPokemons = screen.getByRole('button', {
    name: /Electric/i,
  });
  userEvent.click(eletricPokemons);
  const pikachu = screen.getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();

  const firePokemons = screen.getByRole('button', {
    name: /Fire/i,
  });
  userEvent.click(firePokemons);
  const charmander = screen.getByText('Charmander');
  expect(charmander).toBeInTheDocument();

  const poisonPokemons = screen.getByRole('button', {
    name: /Poison/i,
  });
  userEvent.click(poisonPokemons);
  const ekans = screen.getByText('Ekans');
  expect(ekans).toBeInTheDocument();
});

test('reset filter by clicking "all" button', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const firePokemons = screen.getByRole('button', {
    name: /Fire/i,
  });
  userEvent.click(firePokemons);
  const charmander = screen.getByText('Charmander');
  expect(charmander).toBeInTheDocument();
  const allPokemons = screen.getByRole('button', {
    name: /All/i,
  });
  userEvent.click(allPokemons);
  const pikachu = screen.getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
});

test('show a button for each atributte', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const atributtes = ['Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal'];
  const elementButton = screen.getAllByTestId('pokemon-type-button');
  expect(elementButton).toHaveLength(atributtes.length);
});
