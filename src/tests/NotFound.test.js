import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import NotFound from '../components/NotFound';

test('test the route', () => {
  const { history, getByRole } = renderWithRouter(<App />);
  history.push('/error-test');
  const message = getByRole('heading', {
    level: 2,
  });
  expect(message).toBeInTheDocument();
  expect(message).toHaveTextContent('Page requested not found');
});

test('test the image', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);
  const images = getAllByRole('img');
  expect(images[0]).toHaveAttribute('aria-label', expect.stringMatching('Crying emoji'));
  expect(images[1]).toHaveAttribute('src', expect.stringMatching('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'));
});
