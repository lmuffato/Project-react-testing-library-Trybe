import React from 'react';
import { MemoryRouter } from 'react-router-dom';
// import { render, screen } from '@testing-library/react';
import About from '../components/About';
// import renderWithRouter from './renderWithRouter';

test('Verifica se as informações sobra a Pokedex aparecem', () => {
  render(<About />);
  const h2Text = screen.getByRole('heading', {
    name: /About Pokédex/i,
  });
  expect(h2Text).toBeInTheDocument();
});

test('Verifica se as informações sobra a Pokedex aparecem', () => {
    render(<About />);
    const h2Text = screen.getByRole('heading', {
      name: /'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'/i,
    });
    expect(h2Text).toBeInTheDocument();
  });
