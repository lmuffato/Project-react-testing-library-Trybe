import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Test <App />', () => {
  test('Test index page', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);
    expect(pathname).toBe('/');
  });
  test('Test not found page', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/favpokemonster');
    const notFound = getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});

describe('Test nav links', () => {
  test('Test if links is in the document', () => {
    const { getByRole } = renderWithRouter(<App />);
    const homeLink = getByRole('link', {
      name: /home/i,
    });
    const aboutLink = getByRole('link', {
      name: /about/i,
    });
    const favPkmnLink = getByRole('link', {
      name: /favorite/i,
    });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favPkmnLink).toBeInTheDocument();
  });
});

describe('Test links redirection', () => {
  test('Clicking on home link', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const homeLink = getByText(/home/i);
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Clicking on about link', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const aboutLink = getByText(/about/i);
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Clicking on favorite pokemons link', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const favLink = getByText(/favorite/i);
    userEvent.click(favLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
