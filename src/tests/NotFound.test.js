import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('Teste o componente <About.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found 😭', (
    () => {
      renderWithRouter(<NotFound />);
      const textHeading = screen.getByRole('heading', {
        name: /Page requested not found/i,
        level: 2,
      });
      expect(textHeading).toBeInTheDocument();
    }));

  it('Teste se página mostra a imagem ', () => {
    renderWithRouter(<NotFound />);
    const imgRole = screen.getAllByRole('img')[1];
    const imgLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imgRole).toHaveAttribute('src', imgLink);
  });
});
