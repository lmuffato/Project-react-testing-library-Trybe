import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test App', () => {
  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Encountered pokémons');
    expect(home).toBeInTheDocument();
  });
});
