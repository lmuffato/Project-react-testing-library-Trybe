import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

test('should not found page contains H2 text with Page request not found', () => {
  render(<NotFound />);
  const notFoundText = screen.getByText(/Page requested not found/);

  expect(notFoundText).toBeInTheDocument();
});

test('should not found page display pikachu crying image', () => {
  render(<NotFound />);
  const srcImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const notFoundImage = screen
    .getByAltText(/Pikachu crying because the page requested was not found/);

  expect(notFoundImage.src).toContain(srcImage);
});
