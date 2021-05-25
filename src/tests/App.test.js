import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('tenting App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('links are in the home', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const firstLink = getByRole('link', { name: /home/i });
    const secondLink = getByRole('link', { name: /about/i });
    const thirdLink = getByRole('link', { name: /favorite/i });

    expect(firstLink).toBeInTheDocument();
    expect(secondLink).toBeInTheDocument();
    expect(thirdLink).toBeInTheDocument();
  });

  test('Home renders app', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /home/i });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('About go to /about', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /about/i });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Favorite Pokémons go to /favorites', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /favorite/i });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('NotFound when not have a know url', () => {
    const { history, getByText } = renderWithRouter(<App />);

    history.push('/noFound/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
