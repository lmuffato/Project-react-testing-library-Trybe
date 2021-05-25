import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('test if the component NotFound renders perfectly', () => {
  test('render a text with "Page requested not found"', () => {
    const { getByRole } = render(<NotFound />);
    const heading = getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(heading).toBeInTheDocument();
  });
  test('the correct url for the image', () => {
    const { getByRole } = render(<NotFound />);
    const image = getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
