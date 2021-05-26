import React from 'react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

test('Testa se tem texto "page request not found"', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const heading = getByRole('heading', { name: /page requested not found/i });
  expect(heading).toBeInTheDocument();
});

test('Testa se página mostra imagem de notFound', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);
  const img = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const image = getAllByRole('img');
  expect(image[1].src).toBe(img);
});
