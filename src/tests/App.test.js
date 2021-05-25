import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Tests the <App> component', () => {
  it('renders a heading with the text `Pokédex`', () => {
    renderWithRouter(<App />);
    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
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
  });
});
