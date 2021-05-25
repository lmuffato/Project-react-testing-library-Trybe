import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('testing all screen application of the NotFound', () => {
  it('check if page contains header h2 whith the text "Page requested not found 😭"',
    () => {
      const { getByRole } = renderWithRouter(<NotFound />);
      const header = getByRole('heading', {
        name: /Page requested not found/i,
      });
      expect(header).toBeInTheDocument();
    });
  it('check image NotFound', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText(/Pikachu crying/i);
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
