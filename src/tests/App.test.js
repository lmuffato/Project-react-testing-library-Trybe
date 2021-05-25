import React from 'react';
import userEvent from '@testing-library/user-event';
import createMemoryHistory from 'history/createMemoryHistory';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Tests whether headings are being rendered', () => {
  it('renders a heading with the text `Pokédex`', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { level: 1, name: /Pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders a heading with the text `Encountered pokémons`', () => {
    renderWithRouter(<App />);
    const heading = screen
      .getByRole('heading', { level: 2, name: /Encountered Pokémons/i });
    expect(heading).toBeInTheDocument();
  });
});

describe('Tests whether the navbar and its links are being rendered', () => {
  it('renders a navbar', () => {
    renderWithRouter(<App />);
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });

  it('renders a link with text home', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();
  });

  it('renders a link with text about', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /about/i });
    expect(home).toBeInTheDocument();
  });

  it('renders a link with text favorite pokémons', () => {
    renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritePokemons).toBeInTheDocument();
  });
});

describe('Tests click event on navbar links', () => {
  it('link home redirects to /', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    const pathResource = history.location.pathname;
    expect(pathResource).toBe('/');
  });
});
