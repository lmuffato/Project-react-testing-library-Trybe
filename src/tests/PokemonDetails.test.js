import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from './mockPokemons';

describe('test the PokemonDetails component', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
  });
  test('if has the heading Pikachu Details', () => {
    const pikachuHeading = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(pikachuHeading).toBeInTheDocument();
  });
  test('if has the heading Summary', () => {
    const summary = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(summary).toBeInTheDocument();
  });
  test('if is rendered the correct image of location', () => {
    const pikachuLocations = screen.getAllByRole('img', {
      name: /pikachu location/i,
    });
    expect(pikachuLocations[0].src).toBe(pokemons[0].foundAt[0].map);
  });
  test('if has the text: "Game Locations of Pikachu"', () => {
    const heading = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(heading).toBeInTheDocument();
  });
  test('if has the correct summary', () => {
    const { summary } = pokemons[0];
    const text = screen.getByText(summary);
    expect(text).toBeInTheDocument();
  });
  test('if has the text: "Pokemon favoritado?"', () => {
    const text = screen.getByLabelText(/pokémon favoritado?/i);
    expect(text).toBeInTheDocument();
  });
});
