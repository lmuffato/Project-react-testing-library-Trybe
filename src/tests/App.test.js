import React from 'react';
import { MemoryRouter } from 'react-router-dom';
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
});
