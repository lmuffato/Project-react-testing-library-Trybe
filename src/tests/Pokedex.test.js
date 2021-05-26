import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokedex', () => {
  const pokemonTestID = 'pokemon-name';

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
    const pokemom = screen.getByTestId(pokemonTestID);
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

    const pokemon = screen.getByTestId(pokemonTestID);
    expect(pokemon.innerHTML).toBe('Pikachu');

    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);

    expect(pokemon.innerHTML).toBe('Dragonair');
    userEvent.click(nextPokemonBtn);
    expect(pokemon.innerHTML).toBe('Pikachu');
  });

  test('There is only one pokemon at time', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(pokemonTestID);
    const nextPokemonBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(pokemon.length).toBe(1);
    userEvent.click(nextPokemonBtn);
    expect(pokemon.length).toBe(1);
  });

  test('There are type filter buttons', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const typesAmount = 7;
    expect(filterButtons).toHaveLength(typesAmount);
    expect(filterButtons[0].innerHTML).toBe('Electric');
    expect(filterButtons[5].innerHTML).toBe('Normal');
    expect(filterButtons[0]).toBe('Normal');
  });
});
