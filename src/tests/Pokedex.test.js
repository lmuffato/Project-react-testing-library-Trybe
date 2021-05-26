import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../services/renderWithRouter';
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

describe('Testing Pokedex', () => {
  it('testing h2 element', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const heading = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(heading).toBeInTheDocument();
  });
  it('Testing all buttons', () => {
    const { getByRole, getByText, getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const nextBtn = getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextBtn);
    const charmander = getByText(/Charmander/i);

    expect(charmander).toBeInTheDocument();

    const allBtn = getByRole('button', { name: /All/i });
    userEvent.click(allBtn);
    const pokemon = getByText(/Pikachu/i);

    expect(pokemon).toBeInTheDocument();
    expect(nextBtn.disabled).toBe(false);

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
  // Creditos Bruno Mendes
});
