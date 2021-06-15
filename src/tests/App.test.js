import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('App.js tests', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders homepage in the "/" path ', () => {
    const { getByText } = renderWithRouter(<App />);
    const homePage = getByText('Encountered pokémons');
    expect(homePage).toBeInTheDocument();
  });

  it('nav bar have 3 links', () => {
    const { getAllByRole, getByRole } = renderWithRouter(<App />);
    const navBar = getAllByRole('navigation');
    expect(navBar).toHaveLength(1);

    const home = getByRole('link', { name: 'Home' });
    // 'modelo: para usar o getByRole(expectedRole, { name: 'The name' })'
    // referência: https://testing-library.com/docs/queries/byrole/
    expect(home).toBeInTheDocument();

    const about = getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();

    const favoritePokemons = getByRole('link', { name: 'About' });
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('click in "Home" and redirect to "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText('Home'));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('click in "About" and redirect to "/about"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText('About'));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('click in "About" and redirect to "/about"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    userEvent.click(getByText('Favorite Pokémons'));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('not found page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/someRandomPage');
    const noMatch = getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
