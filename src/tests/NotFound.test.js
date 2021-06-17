import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Teste se página contém um h2 com o texto Page requested not found. ', () => {
  render(
    <MemoryRouter initialEntries={ ['/notFound'] }>
      <App />
    </MemoryRouter>,
  );

  const h2NotFound = screen
    .getByRole('heading', { name: /Page requested not found/i, level: 2 });
  expect(h2NotFound).toBeInTheDocument();
  const img = screen.getByRole(
    'img', { name: /Pikachu crying because the page requested was not found/i },
  );
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
