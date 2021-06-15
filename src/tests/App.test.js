import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('tests for the App component', () => {
  it('Tests whether the Pokédex main page is rendered in the URL path /', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('test redirect with home link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkHome = getByText(/Home/i);
    expect(linkHome).toBeInTheDocument();

    fireEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  it('test redirect with about link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkAbout = getByText(/About/i);
    expect(linkAbout).toBeInTheDocument();

    fireEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  it('test redirect with favorite link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkFavorite = getByText(/Favorite Pokémon/i);
    expect(linkFavorite).toBeInTheDocument();

    fireEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });
});
