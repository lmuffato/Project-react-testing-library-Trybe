import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test \'Not Found\' page', () => {
  it('Test if \'Not Found\' page contains title', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });

  it('Test if \'Not Found\' page contains image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const notFoundImage = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(notFoundImage.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
