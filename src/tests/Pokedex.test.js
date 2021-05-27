import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';

const pokemonsData = [
  {
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      measurementUnit: 'kg',
      value: '6.0',
    },
    id: 25,
  },
  {
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      measurementUnit: 'kg',
      value: '8.5',
    },
    id: 4,
  },
  {
    name: 'Rapidash',
    type: 'Fire',
    averageWeight: {
      measurementUnit: 'kg',
      value: '95.0',
    },
    id: 78,
  },
];

const isPokemonFavoriteData = {
  25: false,
  4: false,
  78: false,
};

describe('Component Pokedex.js tests', () => {
  test('There is a h2 heading with text Encountered pokémons', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <Pokedex
          pokemons={ pokemonsData }
          isPokemonFavoriteById={ isPokemonFavoriteData }
        />
      </BrowserRouter>,
    );

    const heading = getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Another pokemon is displayed when Next Button is clicked', () => {
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <Pokedex
          pokemons={ pokemonsData }
          isPokemonFavoriteById={ isPokemonFavoriteData }
        />
      </BrowserRouter>,
    );

    const nextPokeBtn = getByTestId('next-pokemon');
    fireEvent.click(nextPokeBtn);

    const nextPoke = getByText('Charmander');

    expect(nextPoke).toBeInTheDocument();
  });

  test('Only 1 pokemon is displayed at a time', () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <Pokedex
          pokemons={ pokemonsData }
          isPokemonFavoriteById={ isPokemonFavoriteData }
        />
      </BrowserRouter>,
    );

    const allNames = getAllByTestId('pokemon-name');

    expect(allNames.length).toBe(1);
  });

  test('There is filter buttons on the screen', () => {
    const { getByText, getAllByTestId } = render(
      <BrowserRouter>
        <Pokedex
          pokemons={ pokemonsData }
          isPokemonFavoriteById={ isPokemonFavoriteData }
        />
      </BrowserRouter>,
    );

    const btnAll = getByText('All');
    const filterBtns = getAllByTestId('pokemon-type-button');

    expect(btnAll).toBeInTheDocument();
    expect(filterBtns.length).toBeGreaterThan(0);
  });

  test('Filter buttons actually Work', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Pokedex
          pokemons={ pokemonsData }
          isPokemonFavoriteById={ isPokemonFavoriteData }
        />
      </BrowserRouter>,
    );

    const btnFire = getByText('Fire');
    const btnNext = getByText('Próximo pokémon');

    fireEvent.click(btnFire);
    const charmander = getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    fireEvent.click(btnNext);
    const rapidash = getByText('Rapidash');
    expect(rapidash).toBeInTheDocument();
  });

  test('Filter btn All actually Work', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Pokedex
          pokemons={ pokemonsData }
          isPokemonFavoriteById={ isPokemonFavoriteData }
        />
      </BrowserRouter>,
    );

    const btnAll = getByText('All');
    const btnNext = getByText('Próximo pokémon');
    expect(btnAll).toBeInTheDocument();

    fireEvent.click(btnAll);

    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    fireEvent.click(btnNext);
    const charmander = getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    fireEvent.click(btnNext);
    const rapidash = getByText('Rapidash');
    expect(rapidash).toBeInTheDocument();
  });
});
