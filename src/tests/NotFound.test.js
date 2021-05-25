import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('NotFound.js', () => {
  test('tensting page', () => {
    const { getAllByRole, getByText } = renderWithRouter(<NotFound />);
    const textoPrincipal = getByText('Page requested not found');
    expect(textoPrincipal.tagName).toBe('H2');
    const image = getAllByRole('img');
    expect(image[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
