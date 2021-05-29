import React from 'react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

describe('Test component <Pokedex />', () => {
  test('Test heading', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const heading = getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  test('Test next button', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const btn = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(btn).toBeInTheDocument();
  });
  test('Test if just one pokemon is on screen', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const poke = document.getElementsByClassName('pokemon-overview');
    expect(poke.length).toBe(1);
  });
});
