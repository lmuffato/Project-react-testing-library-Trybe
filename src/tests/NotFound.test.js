// import { getByRole } from '@testing-library/dom';
import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('renderizar o componente NotFound', () => {
  it('deve verificar o h2 contém a mensagem "Page requested not found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const h2 = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(h2).toBeInTheDocument();
  });
  it('deve verificar se possui a imagem "Crying emoji"', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imagemAlt = getByAltText(/Pikachu crying because/);
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imagemAlt).toHaveAttribute('src', imgSrc);
  });
});
