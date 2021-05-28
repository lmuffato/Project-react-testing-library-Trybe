// import { render } from '@testing-library/react';
import React from 'react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
// Ajuda do Murilo Gonçalvez;
const favoritePokemons = pokemons.reduce(
  (acc, current) => ({ ...acc, [current.id]: false }), {},
);

describe('testando component pokedex', () => {
  test('testando se contem um h2 com o texto correto', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    const h2 = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(h2).toBeInTheDocument();
  });
});
