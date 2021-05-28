import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('render pokemon card itens', () => {
  it('render pokemon name', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });

  it('render pokemon type', () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toMatch(/electric/i);
  });

  it('render pokemon weight', () => {
    renderWithRouter(<App />);
    const pokemonWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();
  });

  it('render pokemon weight', () => {
    renderWithRouter(<App />);
    const pokemonImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImg).toBeInTheDocument();
  });
});
