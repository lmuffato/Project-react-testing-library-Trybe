import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

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

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const navLinks = getByRole('navigation');
  expect(navLinks).toBeInTheDocument();

  const linkHome = getByRole('link', { name: 'Home' });
  expect(linkHome).toBeInTheDocument();

  const linkAbout = getByRole('link', { name: 'About' });
  expect(linkAbout).toBeInTheDocument();

  const linkFavoritePokemons = getByRole('link', { name: 'Favorite Pokémons' });
  expect(linkFavoritePokemons).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página inicial,'
  + 'na URL / ao clicar no link Home da barra de navegação', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('link', { name: /home/i }));

  const { pathname } = history.location;

  expect(pathname).toBe('/');
});

test('Teste se a aplicação é redirecionada para a página de About, na URL /about,'
  + 'ao clicar no link About da barra de navegação', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('link', { name: /about/i }));

  const { pathname } = history.location;

  expect(pathname).toBe('/about');
});

test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,'
 + 'na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('link', { name: /Favorite Pokémons/i }));

  const { pathname } = history.location;

  expect(pathname).toBe('/favorites');
});

test('Teste se a aplicação é redirecionada para a página Not Found,'
 + 'ao entrar em uma URL desconhecida', () => {
  const { getByText, history } = renderWithRouter(<App />);

  history.push('/teste');

  const pageNotFound = getByText('Page requested not found');

  expect(pageNotFound).toBeInTheDocument();
});
