import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test App', () => {
  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Encountered pokémons');
    expect(home).toBeInTheDocument();
  });
  test('testing Home link', () => {
    const { getByRole } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);
  });
  test('testing About link', () => {
    const { getByRole } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);
  });
  test('testing Favorite link', () => {
    const { getByRole } = renderWithRouter(<App />);
    const favLink = screen.getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(favLink);
  });
});
