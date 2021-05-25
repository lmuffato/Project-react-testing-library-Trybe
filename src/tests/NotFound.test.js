import React from 'react';
import { render, screen } from '@testing-library/react';
import alias from './utils/alias';

import NotFound from '../components/NotFound';

describe('Testes para o componente "NotFound.js"', () => {
  const { expectToBeInTheDocument } = alias;

  test('A página contém um heading "h2" com o texto "Page requested not found 😭"', () => {
    render(<NotFound />);

    expectToBeInTheDocument(
      screen.getByRole('heading', {
        name: 'Page requested not found Crying emoji',
        level: 2,
      }),
    );
  });

  test('A página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    render(<NotFound />);

    const img = screen.getByRole('img', { name: /pikachu crying/i });

    expectToBeInTheDocument(img);
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
