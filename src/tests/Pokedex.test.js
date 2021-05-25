import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import data from '../data';

describe('tests the pokedex component', () => {
  const pokemonsFavorites = {
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
  const pokemons = data;
  const NEXT_POKEMON = 'Próximo pokémon';

  test('tests whether the heading is rendered with the correct text', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ pokemonsFavorites } />
      </MemoryRouter>,
    );
    const headingTwo = getByRole('heading',
      { name: 'Encountered pokémons', level: 2 });
    expect(headingTwo).toBeInTheDocument();
  });
  test('the next Pokémon is displayed when the Next Pokémon button is clicked', () => {
    const { getByRole, getByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ pokemonsFavorites } />
      </MemoryRouter>,
    );

    const nextPokemon = getByRole('button', { name: NEXT_POKEMON });
    expect(nextPokemon).toHaveTextContent('Próximo pokémon');

    let currentPokemon;
    pokemons.forEach((pokemon) => {
      currentPokemon = getByTestId('pokemon-name');
      expect(currentPokemon).toBeInTheDocument();
      expect(currentPokemon).toHaveTextContent(pokemon.name);
      userEvent.click(nextPokemon);
    });

    // test if list return to 0
    expect(currentPokemon).toHaveTextContent(pokemons[0].name);
    userEvent.click(nextPokemon);
  });
  test('if only one Pokémon is shown at a time', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ pokemonsFavorites } />
      </MemoryRouter>,
    );

    let pokemon;
    try {
      pokemon = getAllByTestId('pokemon-name');
    } catch (e) {
      pokemon = 0;
    }
    expect(pokemon).toHaveLength(1);
  });
  test('if the Pokédex has the filter buttons.', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ pokemonsFavorites } />
      </MemoryRouter>,
    );

    const buttonsFilter = getAllByTestId('pokemon-type-button');
    buttonsFilter.forEach((button) => {
      const { type } = pokemons.find((pokemon) => pokemon.type === button.textContent);
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(type);
    });
  });
  test('tests if the filter buttons work correctly', () => {
    const { getAllByTestId, getByTestId, getByRole } = render(
      <MemoryRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ pokemonsFavorites } />
      </MemoryRouter>,
    );

    let pokemonType;

    const buttonsFilter = getAllByTestId('pokemon-type-button');
    userEvent.click(buttonsFilter[0]);

    const nextPokemon = getByRole('button', { name: NEXT_POKEMON });

    for (let i = 0; i < pokemons.length; i += 1) {
      pokemonType = getByTestId('pokemon-type');
      userEvent.click(nextPokemon);
      expect(pokemonType).toHaveTextContent('Electric');
    }
  });
});
