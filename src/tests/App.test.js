import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
