import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('Tests the home page', () => {
  test('Testa se a página NotFound contém um h2 e seu texto correspondente', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const noMatchPath = getByRole('heading', {
      level: 2,
      name: /^Page requested not found/i,
    });
    expect(noMatchPath).toBeInTheDocument();
  });

  test('deve renderizar uma imagem com URL específica', () => {
    const srcImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const { getByRole } = renderWithRouter(<NotFound />);
    expect(getByRole('img', {
      name: /^Pikachu/i,
    })).toHaveAttribute('src', srcImg);
  });
});
