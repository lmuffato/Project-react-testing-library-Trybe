import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testing the component <App.js />', () => {
  test('renders a reading with the text `Pokédex`', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('shows Home, About and Favorite Pókemons links on top of the page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });

    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });

    expect(linkAbout).toBeInTheDocument();

    const linkFavoritePokemons = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  test('click on Home link redirects to path = / ', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });

    userEvent.click(linkHome);

    const textHome = screen.getByText(/encountered/i);

    expect(textHome).toBeInTheDocument();
  });

  test('click on About link, redicrect to /about', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const navAbout = getByRole('link', { name: /about/i });

    userEvent.click(navAbout);

    history.push('/about');

    const textAbout = screen.getByRole('heading', { name: /about/i });

    expect(textAbout).toBeInTheDocument();
  });

  test('click on Favorite Pokemons redirects to /favorites', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    const navFav = getByRole('link',
      { name: /favorite pokémons/i });

    userEvent.click(navFav);

    history.push('/favorites');

    const textFav = screen.getByRole('heading',
      { name: /favorite pokémons/i });

    expect(textFav).toBeInTheDocument();
  });

  test('random URL may render path /notFound', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/random-url');

    const notFoundImg = screen.getByText(/page requested not found/i);

    expect(notFoundImg).toBeInTheDocument();
  });
});
