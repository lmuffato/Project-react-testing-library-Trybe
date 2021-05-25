import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('test component NotFound', () => {
  it('testa a mensagem da pagina', () => {
    const { getByRole } = render(<NotFound />);
    const heading = getByRole('heading', {
      name: /Page requested not found/,
    });
    expect(heading).toBeInTheDocument();
  });
  it('testa se a página contem a imagem', () => {
    const { getByRole } = render(<NotFound />);
    const img = getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
