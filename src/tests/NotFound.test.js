import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('testando component NotFound', () => {
  test('teste se página contém um heading h2 com um texto', () => {
    const { getByRole } = render(<NotFound />);
    const h2 = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(h2).toBeInTheDocument();
  });
  test('teste se página contém uma imagem e o src correto', () => {
    const { getByAltText } = render(<NotFound />);
    const img = getByAltText('Pikachu crying because the page requested was not found');
    const srcImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toBe(srcImg);
  });
});
