import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Teste se página contém um heading h2 com o texto Page requested not found', () => {
  const { getByText, getByRole } = render(<NotFound />);
  expect(getByRole('heading')).toBeInTheDocument();
  expect(getByText('Page requested not found')).toBeInTheDocument();
});

test('Teste se página mostra a imagem', () => {
  const { getByAltText } = render(<NotFound />);
  const imagem = getByAltText('Pikachu crying because the page requested was not found');
  expect(imagem).toBeInTheDocument();
  expect(imagem.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
