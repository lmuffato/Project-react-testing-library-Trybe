import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

test('Teste se página contém um heading h2 com o texto Page requested not found', () => {
  renderWithRouter(<NotFound />);

  const contain = screen.getByRole('heading',
    { name: /Page requested not found/i, level: 2 });
  expect(contain).toBeInTheDocument();
});

test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  renderWithRouter(<NotFound />);

  const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  const imageNotFound = screen.getByAltText(
    /pikachu crying because the page requested was not found/i,
  );

  expect(imageNotFound).toBeInTheDocument();
  expect(imageNotFound).toHaveAttribute('src', imgSrc);
});
