import React from 'react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

test('Test 4.0', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const NotFoundText = getByText(/Page requested not found/i);
  expect(NotFoundText).toBeInTheDocument();
});
test('Test 4.1', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const image = getByAltText(/Pikachu crying because the page requested was not found/i);
  expect(image).toBeInTheDocument();
  const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  expect(image.src).toBe(imgUrl);
});
