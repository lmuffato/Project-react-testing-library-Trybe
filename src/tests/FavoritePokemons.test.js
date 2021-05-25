import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { FavoritePokemons } from '../components';

describe('tests for the <FavoritePokemons> component', () => {
  test('renders a reading with the text `Favorite pokémons`', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={ ['/favorites'] }>
        <FavoritePokemons />
      </MemoryRouter>,
    );
    const heading = getByRole('heading', { level: 2, name: /Favorite pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders a paragraph with the text `No favorite pokemon found`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/favorites'] }>
        <FavoritePokemons />
      </MemoryRouter>,
    );
    const text = getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });
});
