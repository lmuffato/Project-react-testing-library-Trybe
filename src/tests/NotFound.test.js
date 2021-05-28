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

test('render an image.gif in Page not founded', () => {
  render(
    <MemoryRouter initialEntries={ ['/*'] }>
      <NotFound />
    </MemoryRouter>,
  );
  const img = document.querySelector('.not-found-image');
  const { src } = img;
  expect(src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
