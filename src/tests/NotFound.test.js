import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './RenderWithRouter';

describe('Teste o componente "NotFound"', () => {
  test('Testa se página contém um h2 com o texto "Page requested not found 😭"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const headingH2 = getByRole('heading', {
      name: /Page requested not found Crying emoji/i,
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();
  });
  test('Testa se página mostra a imagem do pikachu chorando', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imagePikachu = getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });
    expect(imagePikachu).toBeInTheDocument();
    expect(imagePikachu.src).toBe(imgSrc);
  });
});
