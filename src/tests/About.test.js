import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('Tests whether the information about the pokedex is rendered', () => {
  it('Renders a header with the text About Pokedex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(heading).toBeInTheDocument();
  });
});
