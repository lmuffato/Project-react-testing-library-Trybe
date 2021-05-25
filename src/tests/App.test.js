import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('renders the home page', () => {
  it('renders the text "Pokédex"', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokedex = getByText('Pokédex');

    expect(pokedex).toBeInTheDocument();
  });

  it('verify if there is a group of links', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');

    expect(links[0].textContent).toBe('Home');
    expect(links[1].textContent).toBe('About');
    expect(links[2].textContent).toBe('Favorite Pokémons');
  });

  it('verify if the application is redirect to "/" after the link "Home" was clicked',
    () => {
      const { getByText } = renderWithRouter(<App />);
      const homeLink = getByText('Home');

      userEvent.click(homeLink);
      const homePage = getByText('Encountered pokémons');

      expect(homePage).toBeInTheDocument();
    });

  it(`verify if the application is redirect to "/about" after the link "About"
  was clicked`, () => {
    const { getByText } = renderWithRouter(<App />);
    const aboutLink = getByText('About');

    userEvent.click(aboutLink);
    const aboutPage = getByText('About Pokédex');

    expect(aboutPage).toBeInTheDocument();
  });

  it(`verify if the application is redirect to "/favorites" after the link
  "Pokémons Favoritados" was clicked`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritesLink = getByText('Favorite Pokémons');

    userEvent.click(favoritesLink);
    const favoritesPage = getByText('Favorite pokémons');
    const favoritesPathname = history.location.pathname;

    expect(favoritesPage).toBeInTheDocument();
    expect(favoritesPathname).toBe('/favorites');
  });

  it(`verify if the application is redirect to "Not Found" page after the link
  an nonexistent path is passed`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/page');
    const notFoundPage = getByText('Page requested not found');

    expect(notFoundPage).toBeInTheDocument();
  });
});
