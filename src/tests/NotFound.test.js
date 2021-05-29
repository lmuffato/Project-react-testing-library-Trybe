import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 '
  + 'com o texto Page requested not found 😭', () => {
    const screen = renderWithRouter(<NotFound />);
    const regexNotFound = /Page requested not found/i;
    const heading = screen.getByRole('heading', { name: regexNotFound, level: 2 });
    expect(heading).toBeInTheDocument();
    const emoji = screen.getByLabelText('Crying emoji');
    expect(emoji).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem '
  + 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const screen = renderWithRouter(<NotFound />);
    const altTextPikachu = 'Pikachu crying because the page requested was not found';
    const pikachuImage = screen.getByAltText(altTextPikachu);
    expect(pikachuImage).toBeInTheDocument();
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(pikachuImage.src).toBe(src);
  });
});
