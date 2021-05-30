import React from 'react';
import renderWithRouter from '../RenderWithRouter';
import { NotFound } from '../components';

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const heading = getByText(/Page requested not found/i);
  expect(heading).toBeInTheDocument();
});

test('Teste se página mostra a imagem', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const text = 'Pikachu crying because the page requested was not found';
  const pikachuImage = getByAltText(text);
  expect(pikachuImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
