import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const seven = 7;
const isPokemonFavoriteById = pokemons.map((pokemon) => pokemon.id);

describe('testing all screen application of the Pokedex', () => {
  it('testing screen h2 "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const h2 = getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2 });
    expect(h2).toBeInTheDocument();
  });
  it('testing all buttons', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const nextPokemon = getByRole('button', {
      name: /próximo pokémon/i,
    });
    const allPokemons = getByRole('button', {
      name: /all/i,
    });
    const electricPokemon = getByRole('button', {
      name: /electric/i,
    });
    const firePokemon = getByRole('button', {
      name: /fire/i,
    });
    const bugPokemon = getByRole('button', {
      name: /bug/i,
    });
    const psychicPokemon = getByRole('button', {
      name: /psychic/i,
    });
    const normalPokemon = getByRole('button', {
      name: /normal/i,
    });
    const dragonPokemon = getByRole('button', {
      name: /dragon/i,
    });
    expect(nextPokemon).toBeInTheDocument();
    expect(allPokemons).toBeInTheDocument();
    expect(electricPokemon).toBeInTheDocument();
    expect(firePokemon).toBeInTheDocument();
    expect(bugPokemon).toBeInTheDocument();
    expect(psychicPokemon).toBeInTheDocument();
    expect(normalPokemon).toBeInTheDocument();
    expect(dragonPokemon).toBeInTheDocument();
    // events
    userEvent.click(nextPokemon);
    expect(nextPokemon).toBeInTheDocument('pokemon-name');
    userEvent.click(allPokemons);
    expect(allPokemons).toBeInTheDocument('Pikachu');
    userEvent.click(electricPokemon);
    expect(electricPokemon).toBeInTheDocument('Pikachu');
    userEvent.click(firePokemon);
    expect(firePokemon).toBeInTheDocument('Charmander');
    userEvent.click(bugPokemon);
    expect(bugPokemon).toBeInTheDocument('Caterpie');
    userEvent.click(psychicPokemon);
    expect(psychicPokemon).toBeInTheDocument('Alakazam');
    userEvent.click(normalPokemon);
    expect(normalPokemon).toBeInTheDocument('Snorlax');
    userEvent.click(dragonPokemon);
    expect(dragonPokemon).toBeInTheDocument('Dragonair');
  });
  it('Testing data-testid', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const allDataTestId = getAllByTestId('pokemon-type-button');
    expect(allDataTestId.length).toBe(seven);
  });
});
