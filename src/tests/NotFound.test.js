import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 4', () => {
  test('Testando se a página contém o texto `Page requested not found`', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const pageText = getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2,
    });

    expect(pageText).toBeInTheDocument();
  });

  test('Testando se a imagem renderiza na tela', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const imgText = getByAltText('Pikachu crying because'
    + ' the page requested was not found');
    expect(imgText).toBeInTheDocument();

    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imgText.src).toContain(url);
  });
});
