import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('1 - Testing the <App.js /> component', () => {
  test('renders a reading with the text \'Pokédex\'', () => {
    renderWithRouter(<App />);

    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the home page when the route is \'/\'', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    const homePageText = screen.getByText(/Encountered pokémons/i);

    expect(pathname).toBe('/');
    expect(homePageText).toBeInTheDocument();
  });

  test('the application contains a fixed set of nagivation links', () => {
    renderWithRouter(<App />);

    const headerNavigation = screen.getByRole('navigation');
    const navigationLinks = headerNavigation.getElementsByClassName('link');
    const linksLength = 3;
    const firstLink = navigationLinks[0];
    const secondLink = navigationLinks[1];
    const thirdLink = navigationLinks[2];

    expect(navigationLinks.length).toBe(linksLength);
    expect(firstLink.textContent).toBe('Home');
    expect(secondLink.textContent).toBe('About');
    expect(thirdLink.textContent).toBe('Favorite Pokémons');
  });

  test('go to the home page (/) when clicked in the \'Home\' link', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });

    userEvent.click(homeLink);
    const { location: { pathname } } = history;
    const homeText = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    expect(pathname).toBe('/');
    expect(homeText).toBeInTheDocument();
  });

  test('go to the about page (/about) when clicked in the \'About\' link', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutLink);
    const { location: { pathname } } = history;
    const aboutText = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(pathname).toBe('/about');
    expect(aboutText).toBeInTheDocument();
  });

  test('go to the favorite page (/favorites) when'
  + 'clicked in the \'Favorite Pokémons\' link', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(favoriteLink);
    const { location: { pathname } } = history;
    const favoriteText = screen.getByRole('heading', {
      name: /favorite pokémons/i,
      level: 2,
    });

    expect(pathname).toBe('/favorites');
    expect(favoriteText).toBeInTheDocument();
  });

  test('go to the home page \'/\' after click in the \'Home\' link', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/no-match');
    const notFoundText = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    expect(notFoundText).toBeInTheDocument();
  });
});
