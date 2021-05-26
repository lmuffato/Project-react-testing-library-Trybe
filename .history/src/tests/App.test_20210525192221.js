import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/MemoryRouter';

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Tests if the first link have the text `Home`', () => {
  const { getByText } = renderWithRouter(<App />);
  const LinkHome = screen.getByText(/Home/i);
  expect(getByText(LinkHome)).toBeInTheDocument();
});
