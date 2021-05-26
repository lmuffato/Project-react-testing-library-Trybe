import React from 'react';
import renderWithRouter from './renderWithHistory';
import NotFound from '../components/NotFound';

describe('testes do component About.js', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    expect(getByText(/Page requested /i)).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    expect(getByAltText(/Pikachu crying because/i).src)
      .toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
