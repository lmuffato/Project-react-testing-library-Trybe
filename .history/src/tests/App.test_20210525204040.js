import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/MemoryRouter';

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('Renders app', () => {
  test('Tests if the links have the text `Home,About,Favorite Pokemon.`', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkHome = screen.getByText(/Home/i);
    const linkAbout = screen.getByText(/About/i);
    const linkFavorite = screen.getByText(/Favorite Pokémon/i);

    expect(getByText(linkHome)).toBeInTheDocument();
    expect(getByText(linkAbout)).toBeInTheDocument();
    expect(getByText(linkFavorite)).toBeInTheDocument();
  });

  test('Tests paths given by links', () => {
    const { getByText, getAllByRole, history } = renderWithRouter(<App />);
    const navLink = getAllByRole('link');
    expect(history.location.pathname).toBe('/');

    fireEvent.click(navLink[0]);
    expect(history.location.pathname).toBe('/');

    fireEvent.click(navLink[1]);
    expect(history.location.pathname).toBe('/about');

    fireEvent.click(navLink[2]);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/notfound');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
