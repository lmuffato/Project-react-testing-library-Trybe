import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('tests whether statistical elements are on the screen', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('renders a links main menu', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkHome = getByText(/home/i);
    const linkPokemon = getByText(/Favorite Pokémons/i);
    const linkAbout = getByText(/about/i);

    expect(linkHome).toBeInTheDocument();
    expect(linkPokemon).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
  });
  test('test if links redirect to correct route', () => {
    let testLocation;
    const { getByText } = render(
      <MemoryRouter>
        <App />
        <Route
          path="/"
          render={ ({ location }) => {
            testLocation = location;
            return null;
          } }
        />
      </MemoryRouter>,
    );

    const linkHome = getByText(/home/i);
    userEvent.click(linkHome);
    expect(testLocation.pathname).toBe('/');

    const linkAbout = getByText(/about/i);
    userEvent.click(linkAbout);
    expect(testLocation.pathname).toBe('/about');

    const linkPokemon = getByText(/Favorite Pokémons/i);
    userEvent.click(linkPokemon);
    expect(testLocation.pathname).toBe('/favorites');
  });
});
