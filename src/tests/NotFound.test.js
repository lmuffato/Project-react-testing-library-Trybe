import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('testa se contém um subtítulo na página', () => {
  render(<NotFound />);
  const heading = screen.getByRole('heading', {
    level: 2,
    name: 'Page requested not found Crying emoji',
  });

  expect(heading).toBeInTheDocument();
});

test('teste se a página possui uma imagem', () => {
  render(<NotFound />);
  const image = screen
    .getByAltText('Pikachu crying because the page requested was not found');
  const source = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  expect(image.src).toEqual(source);
});
