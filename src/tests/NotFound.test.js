import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Test if Not found page', () => {
  it('renders Not Found text', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFoundText = getByRole('heading', {
      name: /Page requested not found crying emoji/i,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });
  it('renders requested image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const notFoundImage = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
