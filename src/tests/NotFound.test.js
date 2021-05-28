import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('test component Not Found', () => {
  it('heading h2 have Text Not Found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const textNotFound = getByText(/page requested not found/i);
    expect(textNotFound).toBeInTheDocument();
  });

  it('have especific gif link on src', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imageNotFound = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imageNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
