import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../components';

describe('4 - Testing the component <NotFound />', () => {
  test('The page must contain a heading h2', () => {
    render(<NotFound />);

    const headingText = screen.getByRole('heading', {
      name: /page requested not found/i,
    });

    expect(headingText).toBeInTheDocument();
  });

  test('the page must have a image with a specific source', () => {
    render(<NotFound />);

    const imageSource = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(image.src).toBe(imageSource);
  });
});
