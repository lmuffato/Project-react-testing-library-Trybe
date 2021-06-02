import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Componente NotFound', () => {
  test('Testa a existência de um texto h2 com emoji.', () => {
    const { getByRole } = render(<NotFound />);
    const emoji = getByRole('heading', {
      name: /page requested not found/i });
    expect(emoji).toBeInTheDocument();
  });

  test('Teste se a imagem é renderizada.', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imagem = getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(imagem).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
