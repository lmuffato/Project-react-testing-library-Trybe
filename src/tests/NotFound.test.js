import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Verifica texto h2', () => {
  const { getByRole, getByText } = render(<NotFound />);
  const h2 = getByRole('heading');
  const textH2 = getByText('Page requested not found');

  expect(h2).toBeInTheDocument();
  expect(textH2).toBeInTheDocument();
});

test('Verificando src img', () => {
  const { getByAltText } = render(<NotFound />);
  const alt = 'Pikachu crying because the page requested was not found';
  const img = getByAltText(alt);
  const pathImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  expect(img).toHaveAttribute('src', pathImg);
});
