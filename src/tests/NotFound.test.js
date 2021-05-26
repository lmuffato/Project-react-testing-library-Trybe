import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('NotFound', () => {
  test('Teste se página contém um h2 com o texto Page requested not found 😭', () => {
    const { getByRole, getByAltText } = renderWithRouter(<NotFound />);
    const h2 = getByRole('heading', { level: 2, name: /Page requested not found/ });
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('😭');
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
