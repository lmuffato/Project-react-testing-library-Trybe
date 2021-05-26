import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Component FavoritePokemons.js tests', () => {
  test('There is a h2 heading with text About Pokedex', () => {
    const { getByText } = render(
      <BrowserRouter>
        <FavoritePokemons />
      </BrowserRouter>,
    );

    const emptyMsg = getByText('No favorite pokemon found');
    expect(emptyMsg).toBeInTheDocument();
  });

  test('Pikachu is a favorite pokemons', () => {
    const { getByText } = render(
      <BrowserRouter>
        <FavoritePokemons
          pokemons={ [{
            name: 'Pikachu',
            averageWeight: {
              measurementUnit: 'kg',
              value: '6.0',
            },
            id: 25,
          }] }
        />
      </BrowserRouter>,
    );

    const pokemonName = getByText('Pikachu');

    expect(pokemonName).toBeInTheDocument();
  });
});
