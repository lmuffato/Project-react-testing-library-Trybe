import { render, screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';

describe('Testes do componente NotFound', () => {
  test('Teste se a página contém um h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const notFoundMsg = screen.getByText(/Page requested not found/i);
    expect(notFoundMsg).toBeInTheDocument();
  });
  test('Testa se a página mostra a imagem determinada', () => {
    render(<NotFound />);
    const notFoundImg = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(notFoundImg.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
