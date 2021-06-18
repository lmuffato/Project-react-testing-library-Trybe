import React from 'react';
import renderWithRouter from './RenderWithRouter.test';
import NotFound from '../components/NotFound';

test('Se a página contém um h2 com o texto Page requested not found 😭', () => {
  const { getByRole } = renderWithRouter(<NotFound />);

  const headingNotFound = getByRole('heading', { name: /page requested not found/i });
  expect(headingNotFound).toBeInTheDocument();
});

test('Se a página contém uma imagem', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);

  const imgNotFound = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const imgPokeNotFound = getAllByRole('img');
  expect(imgPokeNotFound[1].src).toBe(imgNotFound);
});
