import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../render/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test page notFound', () => {
  test('Test if has a h2', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Page requested not found');
  });

  test('Test if has image', () => {
    render(<NotFound />);
    const image = document.querySelector('img');
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
