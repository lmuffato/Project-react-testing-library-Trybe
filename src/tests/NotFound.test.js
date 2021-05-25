import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './RenderWithRouter';

describe('Testa component NotFound', () => {
  it('Verifica se contém um heading h2 com o texto Page requested not found 😭', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se página mostra determinada imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const img = getByAltText('Pikachu crying because the page requested was not found');

    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
