import React from 'react';

import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';

import FavoritePokemons from '../components/FavoritePokemons';

test('render text `No favorite pokemon found`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/favorites'] }>
      <FavoritePokemons />
    </MemoryRouter>,
  );
  const text = getByText(/No favorite pokemon found/i);
  expect(text).toBeInTheDocument();
});
