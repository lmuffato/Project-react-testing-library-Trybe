import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import About from '../components/About';
// import renderWithRouter from './renderWithRouter';

test('Teste se a página contém as informações sobre a Pokédex.', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <About />
    </BrowserRouter>,
  );
  const infoPoke = getByRole('heading', { level: 2 });
  expect(infoPoke).toBeInTheDocument();
});
