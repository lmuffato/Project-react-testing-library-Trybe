import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Test Pokemon', () => {
  test('shows the Pokédex title', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();

    const type = getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
  });
});
