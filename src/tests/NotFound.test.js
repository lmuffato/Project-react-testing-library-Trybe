import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

test('', () => {
  render(<NotFound />);
  const notFoundTextEl = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });

  const notFoundImageEl = screen.getAllByRole('img');
  const correctImagePath = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  expect(notFoundTextEl).toBeInTheDocument();
  expect(notFoundImageEl[1].src).toEqual(correctImagePath);
});
