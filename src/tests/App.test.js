import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByText, getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const navigation = getByText('navigation');
  expect(navigation).toBeInTheDocument();

  const navigationHome = getByText('link', { nome: /home/i });
  expect(navigationHome).toBeInTheDocument();

  const navigationAbout = getByRole('link', { nome: /about/i });
  expect(navigationAbout).toBeInTheDocument();

  const navigationFav = getByText('link', { nome: /Favorite Pokémons/i });
  expect(navigationFav).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página inicial', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('Link', { name: /home/i }));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Teste se a aplicação é redirecionada para a página de About', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('Link', { name: /about/i }));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('Link', { name: /favorites/i }));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});
