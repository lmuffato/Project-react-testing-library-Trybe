import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test component NotFound', () => {
  it('Test the component h2 have text Not Found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });

  it('test image render', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imageAlt = getByAltText('Pikachu crying'
    + ' because the page requested was not found');
    const image = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imageAlt).toHaveAttribute('src', image);
  });
});
