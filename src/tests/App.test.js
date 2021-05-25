import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();

    const home = getByRole('link', {
      name: 'Home',
    });
    expect(home).toBeInTheDocument();

    const about = getByRole('link', {
      name: 'About',
    });
    expect(about).toBeInTheDocument();

    const favoritePokemons = getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(favoritePokemons).toBeInTheDocument();
  });
});
