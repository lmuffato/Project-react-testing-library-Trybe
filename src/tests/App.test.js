import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testing the component App', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders a reading with the text `Pokédex` in the URL path `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
    expect(heading).toBeInTheDocument();
  });

  it('testing fixed set of navegation links', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkHome = getByRole('link', {
      name: /home/i,
    });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = getByRole('link', {
      name: /about/i,
    });
    expect(linkAbout).toBeInTheDocument();

    const linkFavorites = getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(linkFavorites).toBeInTheDocument();
  });
});
