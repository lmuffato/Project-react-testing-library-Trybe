import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('testes do componente Not Found', () => {
  it('Testa se página contém um heading h2 com o texto Page requested not found ', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const textNotFound = getByText(/page requested not found/i);
    expect(textNotFound).toBeInTheDocument();
  });
  it('Testa se página mostra uma imagem gif', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imageNotFound = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imageNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
