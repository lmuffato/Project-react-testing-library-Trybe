import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test the "NotFound" component - Requirement 4', () => {
  it('check if the "NotFound" component renders a heading element', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Page requested not found');
  });

  it('check if a image is rendered', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img).toHaveClass('not-found-image');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
