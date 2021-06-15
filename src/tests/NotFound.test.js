import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testa o component Not Found', () => {
  it('Testa se a página tem um h2 com texto: Page requested not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const textTitle = getByText('Page requested not found');
    expect(textTitle).toBeInTheDocument();
  });
  it('Testa se a página tem o endereço da imagem do Pikachu chorando', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText(/Pikachu/i);
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
