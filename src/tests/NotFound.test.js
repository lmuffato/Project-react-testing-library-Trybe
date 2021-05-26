import React from 'react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('4 REQUIREMENT', () => {
  test('app is redirected to not found page, by entering an unknown URL.', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFoundText = getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  test('page contains a image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
