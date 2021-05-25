import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do componente App', () => {
  test('teste da página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    let { pathname } = history.location;
    expect(pathname).toBe('/');
    const navTexts = ['Home', 'About', 'Favorite Pokémons'];
    const navMenu = screen.getAllByRole('link');
    for (let i = 0; i < navMenu.length - 1; i += 1) {
      expect(navMenu[i].innerHTML).toBe(navTexts[i]);
    }
    const homeLink = screen.getByText('Home');
    userEvent.click(homeLink);
    pathname = history.location.pathname;
    expect(pathname).toBe('/');
    const aboutLink = screen.getByText('About');
    userEvent.click(aboutLink);
    pathname = history.location.pathname;
    expect(pathname).toBe('/about');
    const favoritesLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favoritesLink);
    pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
    history.push('/invalido');
    const errorText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(errorText).toBeInTheDocument();
  });
});
