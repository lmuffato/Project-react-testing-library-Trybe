import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const heading = getByText('Page requested not found');

  expect(heading).toBeInTheDocument();
});

test('', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const image = getByAltText('Pikachu crying because the page requested was not found');

  expect(image).toBeInTheDocument();
//   expect(image).toHaveAttribute('img', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
