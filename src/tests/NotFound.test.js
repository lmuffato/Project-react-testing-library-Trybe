import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('testando se existe um título h2 no componente notFound', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const titleNotFound = getByRole('heading', { leve: 2 });
  expect(titleNotFound).toBeInTheDocument();
  expect(titleNotFound).toHaveTextContent('Page requested not found 😭');
});

test('testando se o componente notFound renderiza uma imagem', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const imagem = getByAltText('Pikachu crying because the page requested was not found');
  expect(imagem).toBeInTheDocument();
  expect(imagem.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
