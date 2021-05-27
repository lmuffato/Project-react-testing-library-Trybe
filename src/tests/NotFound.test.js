import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Requirement 4 - testing <NotFound/> component', () => {
  it('Check if it contains tje text "PAge requested not found"', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    expect(getByText('Page requested not found')).toBeDefined();
  });

  it('Check if it contains the image with the source "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    expect(getByAltText('Pikachu crying because the page requested was not found').src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
