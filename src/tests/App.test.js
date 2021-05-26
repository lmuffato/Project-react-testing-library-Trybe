import React from 'react';
import userEvent from '@testing-library/user-event';
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

describe('Tests if you click on the navbar link the page is redirected', () => {
  it('link Home redirects to /', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    const pathResource = history.location.pathname;
    expect(pathResource).toBe('/');
    const heading = screen
      .getByRole('heading', { level: 2, name: /encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('link About redirects to /about', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    const pathResource = history.location.pathname;
    expect(pathResource).toBe('/about');
    const heading = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  it('link Favorites Pokémons redirects to /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favorites = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favorites);
    const pathResource = history.location.pathname;
    expect(pathResource).toBe('/favorites');
    const heading = screen.getByRole('heading', { level: 2, name: /favorite pokémons/i });
    expect(heading).toBeInTheDocument();
  });
});

// it('link Favorite Pokemons redirects to /favorites', () => {
//   const { history } = renderWithRouter(<App />);
//   const home = screen.getByRole('link', { name: /favorite pokémons/i });
//   userEvent.click(home);
//   const pathResource = history.location.pathname;
//   expect(pathResource).toBe('/about');
// });
