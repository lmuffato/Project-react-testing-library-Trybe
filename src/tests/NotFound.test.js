import React from 'react';
/* import { MemoryRouter } from 'react-router-dom'; */
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

test('Teste se página contém um h2 com texto "Page requested not found"', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const h2Text = getByText(/Page requested not found/i);
  expect(h2Text).toBeInTheDocument();
});

test('Teste se página mostra uma imagem', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);
  const tagImg = getAllByRole('img');
  const linkImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  expect(tagImg[1].src).toBe(linkImg);
  expect(tagImg[1]).toBeInTheDocument();
});
