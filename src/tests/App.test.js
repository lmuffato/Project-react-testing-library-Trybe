import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter.test';
import App from '../App';

// Projeto feito com ajuda de Andy

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

test('teste se há um menu fixo, com 3 links', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const navPoke = getByRole('navigation');
  expect(navPoke).toBeInTheDocument();

  const navPokeHome = getByRole('link', { name: /home/i });
  expect(navPokeHome).toBeInTheDocument();

  const navPokeAbout = getByRole('link', { name: /about/i });
  expect(navPokeAbout).toBeInTheDocument();

  const navPokeFavorite = getByRole('link', { name: /favorite pokémons/i });
  expect(navPokeFavorite).toBeInTheDocument();
});

test('Ao clicar em Home é redirecionado para "/"', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('link', { name: /home/i }));

  const { pathname } = history.location;

  expect(pathname).toBe('/');
});

test('Ao clicar em About é redirecionado para "/about"', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('link', { name: /about/i }));

  const { pathname } = history.location;

  expect(pathname).toBe('/about');
});

test('Ao clicar em Favorite Pokémons é redirecionado para "/favorites"', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('link', { name: /favorite pokémons/i }));

  const { pathname } = history.location;

  expect(pathname).toBe('/favorites');
});

test('Acessando uma URL desconhecida é redirecionado para a página Not Found', () => {
  const { getByText, history } = renderWithRouter(<App />);

  history.push('/teste');

  const pokeNotFound = getByText('Page requested not found');
  expect(pokeNotFound).toBeInTheDocument();
});
