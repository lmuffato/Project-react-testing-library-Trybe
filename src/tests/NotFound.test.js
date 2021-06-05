import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Teste se página contém um heading h2 com o text Page requested not found 😭', () => {
  const { getByRole } = render(<NotFound />);
  expect(getByRole('heading', { name: 'Page requested not found Crying emoji' }))
    .toBeInTheDocument();
});

test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { getAllByRole } = render(<NotFound />);
  const imagem = getAllByRole('img');
  expect(imagem[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
