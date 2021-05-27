import React from 'react';
import { NotFound } from "../components";
import renderWithRouter from './renderWithRouter';

test('Teste se página contém um heading h2 com o texto Page requested not found', () => {
  const { getByRole } = renderWithRouter(<NotFound />);

  const h2 = getByRole('heading', { name: /Page requested not found/i, level: 2 });
  expect(h2).toBeInTheDocument();
});

test('Teste se página mostra a imagem', () => {
  const { getByRole } = renderWithRouter(<NotFound />);

  const img = getByRole('img', { name: /Pikachu crying because the page/i });
  expect(img).toBeInTheDocument();
  expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');

})