import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

import { Pokedex } from '../components';
import pokemons from '../data';

const simulatedPokemonFavoriteById = pokemons.filter((id) => id % 2);

const rendering = () => (
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ simulatedPokemonFavoriteById }
    />,
  ));

const currentPokemonAvaliation = (name, testidName, nextButton) => {
  const currentPokemon = screen.getByTestId(testidName);
  expect(currentPokemon.textContent).toBe(name);
  userEvent.click(nextButton);
};

describe('5 - Testing the component <Pokedex />', () => {
  const testidName = 'pokemon-name';

  test('the component must have a heading h2', () => {
    rendering();

    const headingText = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });

    expect(headingText).toBeInTheDocument();
  });

  test('shows the next pokémon in the list and first past the last', () => {
    rendering();

    const allButton = screen.getByRole('button', { name: /all/i });
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextButton).toBeInTheDocument();

    userEvent.click(allButton);

    pokemons.forEach(({ name }) => {
      currentPokemonAvaliation(name, testidName, nextButton);
    });

    const firstPokemon = screen.getByTestId(testidName);
    expect(firstPokemon.textContent).toBe('Pikachu');
  });

  test('shows just one pokémon card per time', () => {
    rendering();

    const pokemonsCards = screen.getAllByTestId(testidName);
    const cardsLength = 1;

    expect(pokemonsCards.length).toBe(cardsLength);
  });

  test('after click in a filter button it shows the pokémons that match', () => {
    rendering();

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    filterButtons.forEach((button) => {
      userEvent.click(button);

      const filterType = button.textContent;
      const filteredPokemons = pokemons.filter(({ type }) => type === filterType);

      filteredPokemons.forEach(({ name, type }) => {
        currentPokemonAvaliation(name, testidName, nextButton);
        expect(type).toBe(filterType);
      });
    });
  });

  test('the buttons are dynamically made', () => {
    rendering();

    const filterButtons = screen.getAllByTestId('pokemon-type-button')
      .map((buttonType) => buttonType.textContent);

    const filteredTypes = pokemons.reduce((totalOfTypes, { type }) => {
      if (totalOfTypes.includes(type)) return totalOfTypes;
      totalOfTypes.push(type);
      return totalOfTypes;
    }, []);

    expect(filterButtons).toEqual(filteredTypes);
  });
});
