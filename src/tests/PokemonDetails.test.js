import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('renders pokemon info', () => {
  it('render pokemon name', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);
    const name = screen.getByTestId('pokemon-name');
    expect(name.textContent).toMatch(/pikachu/i);
  });

  it('render pokemon type', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonDetails);
    const type = screen.getByTestId('pokemon-type');
    expect(type.textContent).toMatch(/electric/i);
  });
});
