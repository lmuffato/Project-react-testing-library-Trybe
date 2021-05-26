import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

/* afterEach(cleanup); */
describe('Trybe default tests', () => {
  it('renders a reading with the text `Pokédex`', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('Tests makes for me', () => {
  describe('Tests with the component \'App\'', () => {
    it('Test the order of links', () => {
      render(
        <MemoryRouter initialEntries={ ['/'] }>
          <App />
        </MemoryRouter>,
      );
      const firstLink = screen.getByRole('link', { name: 'Home' });
      const secondLink = screen.getByRole('link', { name: 'About' });
      const thirdLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
      const allLinks = screen.getAllByRole('link');
      expect(allLinks[0]).toBe(firstLink);
      expect(allLinks[1]).toBe(secondLink);
      expect(allLinks[2]).toBe(thirdLink);
    });
    it('Test with Favorite Pokemons link', () => {
      const { history } = renderWithRouter(<App />);
      const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
      fireEvent.click(favoritePokemons);
      const localPath = history.location.pathname;
      expect(localPath).toBe('/favorites');
    });
    it('Test if page not foud appear when invalid url is called', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/notFoudIsHere');
      const notFoundPage = screen.getByText(/not found/i);
      expect(notFoundPage).toBeInTheDocument();
    });
  });
});
