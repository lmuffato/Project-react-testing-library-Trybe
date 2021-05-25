import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

test('Teste se página contém um "h2" com o texto "Page requested not found"', () => {
  const { getByText, getByAltText } = renderWithRouter(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );

  const alt = /Pikachu crying because the page requested was not found/i;

  const title = getByText(/Page requested not found/i);
  const altImage = getByAltText(alt);

  expect(title).toBeInTheDocument();
  expect(altImage.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
