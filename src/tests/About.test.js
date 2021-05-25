import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from '../components/About';
// import renderWithRouter from './renderWithRouter';

test('Verifica se as informações sobra a Pokedex aparecem', () => {
  render(<About />);
  const h2Text = screen.getByRole('heading', {
    name: /About Pokédex/i,
  });
  expect(h2Text).toBeInTheDocument();
});
