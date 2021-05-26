import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Test App', () => {
  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Encountered pokémons');
    expect(home).toBeInTheDocument();
  });
  test('testing Home link', () => {
    const { getByRole } = renderWithRouter(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);
  });

  test('testing About link', () => {
    const { getByRole } = renderWithRouter(<App />);
    const aboutLink = getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);
  });

  test('testing Favorite link', () => {
    const { getByRole } = renderWithRouter(<App />);
    const favLink = getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(favLink);
  });
});
