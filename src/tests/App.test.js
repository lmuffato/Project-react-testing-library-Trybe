import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Requirement 1)', () => {
  it('Shows the Pokédex when the route is `/`', () => {
    const { renderApp } = renderWithRouter(<App />);
    render(renderApp);
  });

  it('First link must have the text "Home"', () => {
    const { renderApp } = renderWithRouter(<App />);
    render(renderApp);
    const homeTextLink = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(homeTextLink).toBeInTheDocument();
  });

  it('Second link must have the text "About"', () => {
    const { renderApp } = renderWithRouter(<App />);
    render(renderApp);
    const aboutTextLink = screen.getByRole('link', {
      name: /About/i,
    });
    expect(aboutTextLink).toBeInTheDocument();
  });

  it('Third link must have the text "Favorite Pokémons"', () => {
    const { renderApp } = renderWithRouter(<App />);
    render(renderApp);
    const favoritePokemonsTextLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(favoritePokemonsTextLink).toBeInTheDocument();
  });

  it('Clickig on link "Home", the page is redirected to the root', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const homeLink = getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  it('Clickig on link "About", the page is redirected to the /about', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const aboutLink = getByRole('link', {
      name: /About/i,
    });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  it('Clickig on link "Favorite Pokémons", is redirected to /favorites', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const favoritePokemonLink = getByRole('link', {
      name: /Favorite Pokémon/i,
    });
    userEvent.click(favoritePokemonLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('if entering an unknown URL, is redirected to the "Not Found" page.', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/qualquercoisa/');
    const notFound = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });
});
