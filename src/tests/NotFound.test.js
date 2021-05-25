import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

test('deve testar um caminho não existente e a renderização do Not Found', () => {
  const { history } = renderWithRouter(<NotFound />);
  history.push('/pagina/que-nao-existe/');
  const h2Text = screen.getByRole('heading', {
    name: /Page requested not found/i,
  });
  expect(h2Text).toBeInTheDocument();
});
