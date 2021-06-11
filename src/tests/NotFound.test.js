import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requirement 4', () => {
  test('If the page has a h2 with the text "Page requested not found 😭"', () => {
    const { getByRole } = renderWithRouter(
      <NotFound />,
    );
    const h2 = getByRole('heading',
      { name: /page requested not found Crying emoji/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('If the page has the right image', () => {
    const { getByAltText } = renderWithRouter(
      <NotFound />,
    );
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
