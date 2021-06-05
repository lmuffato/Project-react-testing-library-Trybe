import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router';
import App from '../App';

test('should Pokedex heading contains Encountered Pokemons text', () => {
  render(<App />, { wrapper: MemoryRouter });
  const heading = screen.getByRole('heading', { level: 2 });

  expect(heading.textContent).toBe('Encountered pokémons');
});

test('should show next pokemon when button is clicked', () => {
  render(<App />, { wrapper: MemoryRouter });
  const nextButton = screen.getByText(/Próximo pokémon/);

  expect(nextButton).toBeInTheDocument();
  userEvent.click(nextButton);

  const nextPokemon = screen.getByText(/Charmander/);
  expect(nextPokemon).toBeInTheDocument();
});

test('should click Psychic type button then only display that poke type', () => {
  render(<App />, { wrapper: MemoryRouter });
  const psychicButton = screen.getByText(/Psychic/);
  expect(psychicButton).toBeInTheDocument();
  userEvent.click(psychicButton);

  const pokeType = screen.getByTestId('pokemon-type');
  expect(pokeType.textContent).toBe('Psychic');
});

test('should Pokedex contains reset button', () => {
  render(<App />, { wrapper: MemoryRouter });
  const resetButton = screen.getByText(/All/);

  expect(resetButton).toBeInTheDocument();

  userEvent.click(resetButton);
  const pokeName = screen.getByTestId('pokemon-name');
  expect(pokeName.textContent).toBe('Pikachu');
});

test('should Pokedex contains all poke types filter buttons', () => {
  render(<App />, { wrapper: MemoryRouter });

  const electricButton = screen.getAllByText(/Electric/);
  const fireButton = screen.getByText(/Fire/);
  const bugButton = screen.getByText(/Bug/);
  const poisonButton = screen.getByText(/Poison/);
  const psychicButton = screen.getByText(/Psychic/);
  const normalButton = screen.getByText(/Normal/);
  const dragonButton = screen.getByText(/Dragon/);
  const allButton = screen.getByText(/All/);

  expect(electricButton).toBeDefined();
  expect(fireButton).toBeDefined();
  expect(bugButton).toBeDefined();
  expect(poisonButton).toBeDefined();
  expect(psychicButton).toBeDefined();
  expect(normalButton).toBeDefined();
  expect(dragonButton).toBeDefined();
  expect(allButton).toBeInTheDocument();
});

test('should disable next button when only have 1 poke type', () => {
  render(<App />, { wrapper: MemoryRouter });
  const normalButton = screen.getByText(/Normal/);
  userEvent.click(normalButton);

  const nextPokemon = screen.getByTestId('next-pokemon');
  expect(nextPokemon).toBeDisabled();
});
