import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import renderWithRouter from './RenderWithRouter';
import pokemons from '../data';

const favoritePokemons = () => {
  const x = {};
  pokemons.forEach((pokemon) => {
    x[pokemon.id] = false;
  });
  return x;
};

describe('teste do componente pokedex', () => {
  test('test button all', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons() }
    />);

    const textAll = screen.getByText(/all/i);

    expect(textAll).toBeInTheDocument();
  });

  test('test h2', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons() }
    />);

    const heading2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    expect(heading2).toBeInTheDocument();
  });

  test('test button click all', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons() }
    />);

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });

    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);

    const renderPikachu = screen.getByText(/pikachu/i);

    expect(renderPikachu).toBeInTheDocument();
  });

  test('test button electric, fire, etc', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons() }
    />);

    const electricButton = screen.getByRole('button', {
      name: /electric/i,
    });

    expect(electricButton).toBeInTheDocument();
  });

  test('test button proximo pokemon', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons() }
    />);

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(nextButton).toBeInTheDocument();
  });

  test('test button data test id button type', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons() }
    />);

    const typeButton = screen.getAllByTestId('pokemon-type-button');

    expect(typeButton[0]).toBeInTheDocument();
  });
});
