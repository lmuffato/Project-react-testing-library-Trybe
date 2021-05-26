import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../components/Pokedex';

describe('testing the component "Pokedex"', () => {
  it('renders a reading with the text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      name: 'Encountered pokémons',
    });

    expect(heading).toBeInTheDocument();
  });
});
