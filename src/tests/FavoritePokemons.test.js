import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';

describe('Favorite Pokemons', () => {
  test('No Favorite pokémon message, if there is none', () => {
    render(<FavoritePokemons />);
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  test('show all pokémons', () => {
    renderWithRouter(<FavoritePokemons pokemons={ data } />);
    const pokemons = screen.getAllByAltText(/is marked as favorite/i);
    expect(pokemons.length).toBe(data.length);
  });
});
