import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Componente not found', () => {
  test('tteste se a página exibe um cabeçalho h2'
  + ' com o texto `Página solicitada não encontrada`', () => {
    const { getByRole, history } = renderWithRouter(<NotFound />);
    history.push('/dumbpage');
    const heading = getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  test('testa se a pagina nao encontrada contem imagem do pikachu', () => {
    const { getByAltText, history } = renderWithRouter(<NotFound />);
    history.push('/dumppage');
    const image = getByAltText('Pikachu crying because the page requested was not found');
    const imagesrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(imagesrc);
  });
});
