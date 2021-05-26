import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../components/MemoryRouter';

describe('Renders NotFound', () => {
  test('Tests if there are h2 with  the content: Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const h2Finder = getByRole('heading', { level: 2 });

    expect(h2Finder).toHaveTextContent('Page requested not found');
  });
  test('Tests if exists an image', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const imgFinder = getAllByRole('img');
    const imgHttp = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imgFinder[1].src).toContain(imgHttp);
  });
});
