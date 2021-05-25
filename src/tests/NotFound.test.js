import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

test('contains an H2 heading with exact text', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const head = getByRole('heading', {
    name: /Page requested not found/i,
    level: 2,
  });
  expect(head).toBeInTheDocument();
});

test('contains the exact img', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const img = getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src',
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
