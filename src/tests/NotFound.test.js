import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('teste da pagina not found', () => {
  it('texto - Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByText('Page requested not found');

    expect(notFound).toBeInTheDocument();
  });

  it('Imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText('Pikachu crying because the page requested was not found');

    expect(image.getAttribute('src')).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
