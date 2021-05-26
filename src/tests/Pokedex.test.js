import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokedex', () => {
  test('Title is Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });

  test('Show next pokemon when click in button', () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextPokemonBtn);
    const pokemom = screen.getByTestId('pokemon-name');
    expect(pokemom.innerHTML).toBe('Charmander');

    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    expect(pokemom.innerHTML).toBe('Ekans');
  });

  test('Go back to the first pokemon when is in the last', () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    const pokemom = screen.getByTestId('pokemon-name');
    expect(pokemom.innerHTML).toBe('Pikachu');

    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);

    expect(pokemom.innerHTML).toBe('Dragonair');
    userEvent.click(nextPokemonBtn);
    expect(pokemom.innerHTML).toBe('Pikachu');
  });
});
