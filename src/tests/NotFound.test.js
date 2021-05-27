import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

describe('Test NotFound', () => {
  test('testing h2 heading ', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const notFound = getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(notFound).toBeInTheDocument();
  });
  test('testing image ', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const imageNotFound = getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(imageNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
