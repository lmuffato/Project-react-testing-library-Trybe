import React from 'react';
import userEvent from '@testing-library/user-event';
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

  it('testing redirection to the home page by clicking on the  "Home" link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/home/i);
    userEvent.click(home);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const heading = getByText(/pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('testing redirection to the about page by clicking on the  "About" link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/about/i);
    userEvent.click(about);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutText = getByText(/About Pokédex/i);
    expect(aboutText).toBeInTheDocument();
  });

  it(`testing redirection to the About Pokédex page by clicking on the
    "About Pokédex" link`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritePokemons = getByText(/Favorite pokémons/i);
    userEvent.click(favoritePokemons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const favoriteText = getByText(/No favorite pokemon found/i);
    expect(favoriteText).toBeInTheDocument();
  });

  it('testing redirection to the Not Found page by entering an unknown URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/not-found-page');

    const notFoundText = getByText(/Page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
