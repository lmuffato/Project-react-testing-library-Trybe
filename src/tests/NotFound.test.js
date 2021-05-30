import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2'
  + 'com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);

    const alt = 'Pikachu crying because the page requested was not found';
    const imagem = screen.getByAltText(alt);

    expect(imagem).toBeInTheDocument();

    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imagem.src).toBe(src);
  });
});
