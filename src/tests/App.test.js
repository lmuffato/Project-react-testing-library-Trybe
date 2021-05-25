import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('App component', () => {
  test('Renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Heading is rendered with text Pokédex', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');

    const heading = getByRole('heading', {
      name: /pokédex/i,
      level: 1,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Navbar contains a fixed set of navigation links', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');

    const linkAbout = getByRole('link', {
      name: /about/i,
      expandable: false,
    });
    expect(linkAbout).toBeInTheDocument();

    const linkHome = getByRole('link', {
      name: /home/i,
      expandable: false,
    });
    expect(linkHome).toBeInTheDocument();

    const linkFavoritePokemons = getByRole('link', {
      name: /favorite/i,
      expandable: false,
    });
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  test('Application is redirected to About, NotFound or Favorite Pokémons pages', () => {
    const { getByRole, history } = renderWithRouter(<App />);

    history.push('/about');

    const pageAbout = getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(pageAbout).toBeInTheDocument();

    history.push('/rota-que-nao-existe');

    const pageNotFound = getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(pageNotFound).toBeInTheDocument();

    history.push('/favorites');
    const pageFavorites = getByRole('heading', {
      name: 'Favorite pokémons',
      level: 2,
    });
    expect(pageFavorites).toBeInTheDocument();
  });
});
