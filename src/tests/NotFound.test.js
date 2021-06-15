import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import React from 'react';

import NotFound from '../components/NotFound';

const text1 = 'Pikachu crying because the page requested was not found';

describe('Teste o componente <NotFound.js />', () => {
  render(<NotFound />, { wrapper: MemoryRouter });
  const imageAlt = screen.getByAltText(text1);

  test(`Teste se página contém um heading h2 
        com o texto Page requested not found 😭`, () => {
    const pageNotFound = screen.getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });

  test(`Teste se página mostra a imagem
        https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    expect(imageAlt.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
