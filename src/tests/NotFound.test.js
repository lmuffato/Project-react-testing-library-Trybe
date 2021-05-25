import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

test('testes gerais do componente', () => {
  renderWithRouter(<NotFound />);

  const notFoundText = screen.getByRole('heading', {
    level: 2,
  });
  expect(notFoundText).toBeInTheDocument();
  const gifUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const pageGifUrl = screen.getByAltText(/pikachu/i);
  expect(pageGifUrl.src).toEqual(gifUrl);
});
