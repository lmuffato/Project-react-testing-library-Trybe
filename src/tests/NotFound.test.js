import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('test if not found is working', () => {
  const { history, getByText, getByRole } = renderWithRouter(<App />);
  history.push('/notfound');
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
  const imgNotFound = getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });
  expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
