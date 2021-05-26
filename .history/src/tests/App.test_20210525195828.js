import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/MemoryRouter';

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Tests if the links have the text `Home,About,Favorite Pokemon`', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkHome = screen.getByText(/Home/i);
  const linkAbout = screen.getByText(/About/i);
  const linkFavorite = screen.getByText(/Favorite Pokémon/i);

  expect(getByText(linkHome)).toBeInTheDocument();
  expect(getByText(linkAbout)).toBeInTheDocument();
  expect(getByText(linkFavorite)).toBeInTheDocument();
});
