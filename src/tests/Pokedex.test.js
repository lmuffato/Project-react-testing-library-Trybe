import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

describe('"Pokedex" Buttons Tests', () => {
  test('"Header"', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ pokemons }
    />);
    const pageHeader = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pageHeader).toBeInTheDocument();
  });

  test('"All" Button', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const allPokemons = getByRole('button', { name: /all/i });
    userEvent.type(allPokemons);
    expect(allPokemons).toBeInTheDocument();
  });

  test('"Elements" Buttons', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const elementsButtons = getAllByTestId('pokemon-type-button');
    userEvent.type(elementsButtons);
    expect(elementsButtons[0]).toHaveTextContent(/electric/i);
  });

  test('"Next" Button', () => {
    const { getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const nextPokemon = getByTestId('next-pokemon');
    userEvent.type(nextPokemon);
    expect(nextPokemon).toHaveTextContent(/próximo pokémon/i);
  });
});
