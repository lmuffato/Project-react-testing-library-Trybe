import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

describe('Requisito 4 - Teste o componente <NotFound.js />',
  () => {
    it('Teste se página contém um heading h2 com o texto Page requested not found 😭',
      () => {
        const { getByRole } = render(<NotFound />);
        const text = getByRole('heading',
          { name: 'Page requested not found Crying emoji',
            level: 2 });
        expect(text).toBeInTheDocument();
      });
    it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
      () => {
        const { getByRole } = render(<NotFound />);
        const image = getByRole('img',
          { name: 'Pikachu crying because the page requested was not found' });
        expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
      });
  });
