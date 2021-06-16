import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './RenderWithRouter';

describe('Teste do componente not found', () => {
  test('teste heading', () => {
    renderWithRouter(<NotFound />);

    const notFounds = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(notFounds).toBeInTheDocument();
  });

  test('testando imagem', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getAllByRole('img');
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img[1].src).toBe(imgSrc);
  });
});
