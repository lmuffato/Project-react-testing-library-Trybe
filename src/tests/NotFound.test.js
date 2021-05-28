import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('NotFound.js tests', () => {
  test('se tem um headind lvl 2', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    // uso da doc https://testing-library.com/docs/queries/byrole
    const headingText = getByRole('heading', {
      name: /Page requested not found/,
      level: 2,
    });
    expect(headingText).toBeInTheDocument();
  });

  test('verificar img', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const altIs = getByAltText('Pikachu crying because the page requested was not found');
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(altIs.getAttribute('src')).toBe(src);
  });
});
