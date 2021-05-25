import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('test nav links at the home page', () => {
  it('test home link', () => {
    const { history } = renderWithRouter(<App />);
    let { pathname } = history.location;
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    pathname = history.location.pathname;
    expect(pathname).toBe('/');
    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('test About link', () => {
    const { history } = renderWithRouter(<App />);
    let { pathname } = history.location;
    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    pathname = history.location.pathname;
    expect(pathname).toBe('/about');
  });

  it('test Favorite Pokémons link', () => {
    const { history } = renderWithRouter(<App />);
    let { pathname } = history.location;
    const favoriteLink = screen.getByText('Favorite Pokémons');
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);
    pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
    const favoriteHeading = screen.getByRole('heading', {
      name: /Favorite Pokémons/i,
    });
    expect(favoriteHeading).toBeInTheDocument();
  });
});
