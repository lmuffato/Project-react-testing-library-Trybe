import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste do componente NotFound.js', () => {
  it('Contém um heading H2 com o texto Page requested not found =/', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });

  it('A página mostra uma imagem', () => {
    renderWithRouter(<NotFound />);

    const imgCrying = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });

    expect(imgCrying.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
