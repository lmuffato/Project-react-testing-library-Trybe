import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

it('contains h2 with the following text "Page requested not found"', () => {
  const { getByRole } = render(<NotFound />);

  const h2 = getByRole('heading', {
    name: /Page requested not found/i,
    level: 2,
  });

  expect(h2).toBeInTheDocument();
});

it('contains a img', () => {
  const { getByAltText } = render(<NotFound />);

  const img = getByAltText('Pikachu crying because the page requested was not found');
  const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  expect(img.src).toContain(url);
});
