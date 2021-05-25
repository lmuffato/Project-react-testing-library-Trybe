import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter.helper';
import { NotFound } from '../components';

describe('Requisito 4', () => {
  test('A página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const h2NotFound = screen.getByRole('heading');
    expect(h2NotFound).toBeInTheDocument();
    expect(h2NotFound).toHaveTextContent(/Page requested not found 😭/i);
  });

  test('A página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByAltText(/requested was not found/i);
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
