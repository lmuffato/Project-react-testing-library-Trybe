import React from 'react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('Test About', () => {
  test('', () => {
    const { getByRole } = renderWithRouter(<About />);

    const pokedex = getByRole('heading', { name: /about pokédex/i });

    expect(pokedex).toBeInTheDocument();
  });
});
