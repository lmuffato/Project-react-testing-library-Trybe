import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';

describe('', () => {
  it('renders a heading with the text `Encountered pokémons`', () => {
    renderWithRouter(<App />);
    const heading = screen
      .getByRole('heading', { level: 2, name: /Encountered Pokémons/i });
    expect(heading).toBeInTheDocument();
  });
});
