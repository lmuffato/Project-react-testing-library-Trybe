import React from 'react';

import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';

import NotFound from '../components/NotFound';

test('render text `Page requested not found 😭`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/*'] }>
      <NotFound />
    </MemoryRouter>,
  );
  const text = getByText(/Page requested not found/i);
  expect(text).toBeInTheDocument();
});
