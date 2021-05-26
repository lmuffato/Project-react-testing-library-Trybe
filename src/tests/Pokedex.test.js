import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Verifica se aparece h2 com texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const h2Text = getByRole('heading', {
    name: /Encountered pokémons/i,
  });
  expect(h2Text).toBeInTheDocument();
});

test('Verifica se botão próximo pokemon funciona', async () => {
  const { getByText } = renderWithRouter(<App />);
  const buttonNext = getByText('Próximo pokémon');
  expect(buttonNext).toBeDefined();
});
