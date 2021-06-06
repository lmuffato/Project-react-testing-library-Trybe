import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import RenderWithRouter from './RenderWithRouter';

describe('Testa componente NoutFoud', () => {
  test('Teste se contém um heading h2 com o texto Page requested not found', () => {
    RenderWithRouter(<NotFound />);
    const notFoudPage = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(notFoudPage).toBeInTheDocument();
  });

  // Ref: https://github.com/tryber/sd-010-a-project-react-testing-library/pull/112/files
  test('Teste se a página contém a imagem correta de uma Pokédex:', () => {
    RenderWithRouter(<NotFound />);
    const imagemSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImage = screen
      .getByAltText(/Pikachu crying because the page requested was not found/);

    expect(notFoundImage.src).toContain(imagemSrc);
  });
});
