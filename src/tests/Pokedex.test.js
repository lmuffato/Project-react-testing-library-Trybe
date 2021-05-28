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
