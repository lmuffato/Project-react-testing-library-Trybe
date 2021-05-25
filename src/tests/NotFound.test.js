import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

describe('Testing NotFound page', () => {
  it('testing heading', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const heading = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    const image = getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });

    expect(heading).toBeInTheDocument();
    expect(image.src).toBe(imgSrc);
  });
});
