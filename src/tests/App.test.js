import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testing App components', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      name: /pokédex/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });

  it('verify if there is `Link` on the page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favoriteLink);
  });

  it('verify texts inside those linked pages', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    expect(about).toBeInTheDocument();

    const favPokemons = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favPokemons).toHaveTextContent('Favorite Pokémons');

    const home = screen.getByRole('link', {
      name: /home/i,
    });
    expect(home).toHaveTextContent('Home');
  });

  it('verify the message /notfound/ is present'
  + 'when there are no routers to be found', () => {
    const { getByRole, history: historyMock } = renderWithRouter(<App />);
    historyMock.push('/notfound');

    const notFound = getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(notFound).toBeInTheDocument();
  });
});
