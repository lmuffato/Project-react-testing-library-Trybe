import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from '../App';

test('O primeiro link deve possuir o texto Home.', () => {
  render(<App />, { wrapper: MemoryRouter });
  screen.getByText(/home/i);
});

test('O segundo link deve possuir o texto About.', () => {
  render(<App />, { wrapper: MemoryRouter });
  screen.getByText(/about/i);
});

test('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
  render(<App />, { wrapper: MemoryRouter });
  screen.getByText(/favorite pokémons/i);
});
