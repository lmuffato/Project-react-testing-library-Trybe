import React from 'react';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import App from '../App';

test('render text "Encountered pokémons"', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const text = getByText(/Encountered pokémons/i);
  expect(text).toBeInTheDocument();
});

test('test button contain the text "Próximo pokémon"', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const text = getByText(/Próximo pokémon/i);
  expect(text).toBeInTheDocument();
});

test('test button in Pokedex ', () => {
  const { getByTestId } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const button = getByTestId('next-pokemon');
  expect(button).toBeInTheDocument();
});
