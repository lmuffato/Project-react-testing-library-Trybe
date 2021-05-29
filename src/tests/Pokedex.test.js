import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import isPokemonFavoriteById from '../isPokemonFavorite-data';

describe('Test the component Pokedex.js', () => {
  it('Test if page have h2 with text encountered pokémons', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const h2Info = getByRole('heading', {
      name: 'Encountered pokémons',
    });
    expect(h2Info).toBeInTheDocument();
  });

  it('Test if the next Pokémon in the list is displayed '
  + 'when the Next pokémon button is clicked', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const nextPokemon = getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextPokemon);
    const pokemon = getByText('Charmander');
    expect(pokemon).toBeInTheDocument();
  });

  it('Test if only one Pokémon is shown at a time', () => {
    const { container } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    expect(container.querySelectorAll('.pokemon').length).toBe(1);
  });

  it('Test if a Pokedex have the filter buttons', () => {
    const { getByRole, getByText, getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const allTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    for (let index = 0; index < allTypes.length; index += 1) {
      const typeBtn = getAllByTestId('pokemon-type-button')[index];
      const proxPokemon = getByRole('button', {
        name: /próximo pokémon/i,
      });
      userEvent.click(typeBtn);
      const filteredPokemons = pokemons.filter((poke) => poke.type === allTypes[index]);
      filteredPokemons.forEach((poke) => {
        expect(getByText(poke.name)).toBeInTheDocument();
        expect(typeBtn).toBeInTheDocument();
        userEvent.click(proxPokemon);
      });
    }
  });

  it('Test if have any button for reset filter', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const resetBtn = getByRole('button', {
      name: /all/i,
    });
    expect(resetBtn).toBeInTheDocument();

    userEvent.click(resetBtn);
    const poke = getByText('Pikachu');
    expect(poke).toBeInTheDocument();
  });

  // it('Test if a button is clicked dynamically', () => {
  // });
});
