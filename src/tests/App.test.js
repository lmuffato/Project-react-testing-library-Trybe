import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('renders a reading with the text `Pokédex`', () => {
  test('testando a pagina de Home', () => {
    const { getByText, history, getByRole } = renderWithRouter(
      <App />,
    );
    const home = getByText(/home/i);
    const { pathname } = history.location;
    userEvent.click(home);
    expect(pathname).toBe('/');
    expect(pathname).not.toBe(/about/i);
    const h2 = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(h2).toBeInTheDocument();

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('testando a pagina About', () => {
    const { getByText, history, getByRole } = renderWithRouter(
      <App />,
    );
    const about = getByText(/about/i);
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
    expect(history.location.pathname).not.toBe('/');
    const h2 = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(h2).toBeInTheDocument();
  });
  test('testando a pagina Favorite Pokémons', () => {
    const { getByText, history, getByRole } = renderWithRouter(
      <App />,
    );
    const favoritePokemons = getByText(/favorite pokémons/i);
    fireEvent.click(favoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
    expect(history.location.pathname).not.toBe('/');
    const h2 = getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/i,
    });
    expect(h2).toBeInTheDocument();
  });
  test('testando a pagina Favorite NotFound', () => {
    const { history, getByRole } = renderWithRouter(
      <App />,
    );
    history.push('/pokemonbrasil');
    expect(history.location.pathname).toBe('/pokemonbrasil');
    const h2 = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(h2).toBeInTheDocument();
  });
});
