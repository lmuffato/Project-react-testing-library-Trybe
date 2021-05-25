import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test(`Teste se a aplicação é redirecionada para a página inicial, na URL "/" 
ao clicar no link "Home" da barra de navegação.`, () => {

  const { getByRole } = renderWithRouter(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const linkHome = getByRole('link', {
    name: /home/i,
  });
  userEvent.click(linkHome);

  const linkAbout = getByRole('link', {
    name: /about/i,
  });
  expect(linkAbout).toBeInTheDocument();
});
