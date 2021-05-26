import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Verificar a página NotFound', () => {
  it('deve renderizar um h2', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const h2 = getByRole('heading', {
      level: 2,
      name: /Page requested not found Crying emoji/i,
    });

    expect(h2).toBeInTheDocument();
  });
  it('deve renderizar uma imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const image = getByAltText('Pikachu crying because the page requested was not found');

    expect(image.src)
      .toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(image).toBeInTheDocument();
  });
});
