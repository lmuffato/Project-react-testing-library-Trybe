import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('tests NotFound.js', () => {
  test('verifies if the page renders the heading "Not Found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const expectedHeading = getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(expectedHeading).toBeInTheDocument();
  });

  test('tests if the given image is rendered', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const notFoundImage = getByAltText('Pikachu crying '
    + 'because the page requested was not found');
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
