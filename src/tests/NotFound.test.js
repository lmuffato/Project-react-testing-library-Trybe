import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

describe('Test component <NotFound />', () => {
  test('Test heading', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  test('Test img', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const img = getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
