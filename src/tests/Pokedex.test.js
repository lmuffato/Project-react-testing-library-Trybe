import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokedex', () => {
  const pokemonTestID = 'pokemon-name';
  const nextPokemonBtn = () => screen.getByRole('button', {
    name: /próximo pokémon/i,
  });

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

    userEvent.click(nextPokemonBtn());
    const pokemom = screen.getByTestId(pokemonTestID);
    expect(pokemom.innerHTML).toBe('Charmander');

    userEvent.click(nextPokemonBtn());
    userEvent.click(nextPokemonBtn());
    expect(pokemom.innerHTML).toBe('Ekans');
  });

  test('Go back to the first pokemon when is in the last', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getByTestId(pokemonTestID);
    expect(pokemon.innerHTML).toBe('Pikachu');

    userEvent.click(nextPokemonBtn());
    userEvent.click(nextPokemonBtn());
    userEvent.click(nextPokemonBtn());
    userEvent.click(nextPokemonBtn());
    userEvent.click(nextPokemonBtn());
    userEvent.click(nextPokemonBtn());
    userEvent.click(nextPokemonBtn());
    userEvent.click(nextPokemonBtn());

    expect(pokemon.innerHTML).toBe('Dragonair');
    userEvent.click(nextPokemonBtn());
    expect(pokemon.innerHTML).toBe('Pikachu');
  });

  test('There is only one pokemon at time', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(pokemonTestID);

    expect(pokemon.length).toBe(1);
    userEvent.click(nextPokemonBtn());
    expect(pokemon.length).toBe(1);
  });

  test('There are type filter buttons', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const typesAmount = 6;
    const types = ['Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal'];
    const buttonsValue = filterButtons.map(({ innerHTML }) => innerHTML);
    expect(filterButtons.length).toBeGreaterThanOrEqual(typesAmount);
    expect(buttonsValue.sort()).toEqual(types.sort());
  });

  test('Click in one filter button will show only the same type pokemons', () => {
    renderWithRouter(<App />);
    const psychicButton = screen.getByRole('button', { name: /psychic/i });
    const normalButton = screen.getByRole('button', { name: /normal/i });
    const pokemon = screen.getByTestId('pokemon-type');

    userEvent.click(psychicButton);
    expect(pokemon.innerHTML).toBe('Psychic');

    userEvent.click(normalButton);
    expect(pokemon.innerHTML).toBe('Normal');
    userEvent.click(nextPokemonBtn());
    expect(pokemon.innerHTML).toBe('Normal');
  });

  test('reset filter button', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    const psychicButton = screen.getByRole('button', { name: /psychic/i });

    const pokemon = screen.getByTestId('pokemon-type');
    expect(allButton).toBeInTheDocument();

    userEvent.click(psychicButton);
    expect(pokemon.innerHTML).toBe('Psychic');

    userEvent.click(allButton);
    expect(pokemon.innerHTML).toBe('Electric');
  });

  test('disable next pokemon button when has one in the list', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    const normalButton = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normalButton);
    expect(nextPokemonBtn()).toBeDisabled();
    userEvent.click(allButton);
    expect(nextPokemonBtn()).not.toBeDisabled();
  });
});
