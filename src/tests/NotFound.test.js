import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Verifica se a página possui', () => {
  const textWarning = 'Page requested not found Crying emoji';
  const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const alt = 'Pikachu crying because the page requested was not found';
  it('um heading h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    const warning = screen.getByRole('heading', { level: 2, name: textWarning });
    expect(warning).toBeInTheDocument();
  });

  it('uma imagem com o src "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(alt);
    expect(image.src).toBe(src);
  });
});
