import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('página contém um heading h2 com o texto Page requested not found 😭', () => {
  render(<NotFound />);
  const headingPage = screen.getByRole('heading', {
    level: 2,
    name: 'Page requested not found Crying emoji',
  });
  expect(headingPage).toBeInTheDocument();
});

test('Teste se página mostra a imagem do pikachu chorando', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const image = getByAltText('Pikachu crying because the page requested was not found');
  expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
