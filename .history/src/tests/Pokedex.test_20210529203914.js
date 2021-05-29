import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/MemoryRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

describe('render Pokedex', () => {
  test('test text h2', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons[0] }
      />,
    );

    const h2Pokedex = getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    expect(h2Pokedex).toBeInTheDocument();
  });

  test('test next pokemon button', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons[0] }
      />,
    );
    const btnNext = getByText('Próximo pokémon');
    userEvent.click(btnNext);
    const charmander = getByText('Charmander');

    expect(charmander).toBeInTheDocument();
  });

  test('test if just one pokemon is shown at a time', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons[0] }
      />,
    );

    const qtdPokemonName = getAllByTestId('pokemon-name').length;
    expect(qtdPokemonName).toBe(1);
  });

  test('test whether the filter buttons exist', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons[0] }
      />,
    );
    const qtdButtons = 7;
    const filtersButton = getAllByTestId('pokemon-type-button');

    expect(filtersButton.length).toBe(qtdButtons);
  });

  test('test if the Pokedéx contains the all button', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons[0] }
      />,
    );
    const btnAll = getByText('All');
    userEvent.click(btnAll);
    const verifyPokemon = getByText('Pikachu');

    expect(verifyPokemon).toBeInTheDocument();
  });

  test('test if the next button is disable when resquested', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons[0] }
      />,
    );

    const btnElectric = getByRole('button', {
      name: 'Electric',
    });

    userEvent.click(btnElectric);
    const btnNext = getByText('Próximo pokémon');

    expect(btnNext).toBeDisabled();
  });
});
