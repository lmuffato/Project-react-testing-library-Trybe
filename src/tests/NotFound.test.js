import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

describe('"NotFound" page tests', () => {
  test('Header', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const header = getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });

    expect(header).toBeInTheDocument();
  });

  test('Show a Crying Pikachu when no Pokemon was Found', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    // https://testing-library.com/docs/queries/about Priority #2 - Semantic Queries
    const notFoundGif = getByAltText('Pikachu crying because'
    + ' the page requested was not found');

    expect(notFoundGif.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(notFoundGif).toBeInTheDocument();

  });
});
