import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('testando a App', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('testing links texts', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    const about = getByText(/About/i);
    const favPoke = getByText(/Favorite Pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favPoke).toBeInTheDocument();
  });

  it('Test if the application is redirected to the home page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText(/Home/i));
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Test if the application is redirected to about page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText(/About/i));
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('Test if the application is redirected to favorite pokemon page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    userEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('Testing not found page', () => {
    const { history, getByRole } = renderWithRouter(<App />);

    history.push('Qualquer coisa');
    const notFound = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFound).toBeInTheDocument();
  });
});
