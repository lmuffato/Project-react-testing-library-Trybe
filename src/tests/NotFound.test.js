import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

test('Teste se página contém um texto Page requested not found', () => {
  const { getByText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );

  expect(getByText('Page requested not found')).toBeInTheDocument();
});

test('Teste se página mostra a imagem', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );

  const images = getAllByRole('img');
  expect(images[0]).toHaveAttribute('aria-label', expect.stringMatching('Crying emoji'));
  expect(images[1]).toHaveAttribute('src',
    expect.stringMatching('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'));
});
