import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from './mockPokemons';

describe('test the component Pokedex', () => {
  test('has the "Encountered Pokémons" text', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const heading = getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });
  test('the first pokemon is Pikachu', () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
  test('when the Fire button is clicked only fire pokemons are rendered', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const fireBtn = getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(fireBtn);
    const charmander = getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    const nextPokemon = getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextPokemon);
    const rapidash = getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();

    userEvent.click(nextPokemon);
    expect(charmander).toBeInTheDocument();
  });
  test('if the all Button is rendered', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const allBtn = getByRole('button', {
      name: /all/i,
    });
    expect(allBtn).toBeInTheDocument();
  });
  test('if has 3 pokemon types', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const numberOfTypes = 3;
    const types = getAllByTestId('pokemon-type-button');
    expect(types.length).toBe(numberOfTypes);
  });
  test('when the all Button is clicked pikachu is rendered', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const allBtn = getByRole('button', {
      name: /all/i,
    });
    const fireBtn = getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(fireBtn);
    userEvent.click(allBtn);
    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
