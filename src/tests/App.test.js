import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Test App', () => {
  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText('Encountered pokémons');

    expect(home).toBeInTheDocument();
  });

  test('testing Home link', () => {
    const { getByRole, history: { location: { pathname } } } = renderWithRouter(<App />);

    const homeLink = getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);
    expect(pathname).toBe('/');
  });

  test('testing About link', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const aboutLink = getByRole('link', {
      name: /about/i,
    });

    userEvent.click(aboutLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('testing Favorite link', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const favLink = getByRole('link', {
      name: /favorite/i,
    });

    userEvent.click(favLink);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('testing Page not found', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/route-not-exists');

    const notExists = getByRole('heading', {
      name: /page requested not found/i,
    });

    expect(notExists).toBeInTheDocument();
  });
});
