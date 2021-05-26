import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('testa se há um menu fixo, com links pra Home, About e Favorite Pokemons', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const navigation = getByRole('navigation');
  expect(navigation).toBeInTheDocument();

  const navHome = getByRole('link', { name: /home/i });
  expect(navHome).toBeInTheDocument();

  const navAbout = getByRole('link', { name: /about/i });
  expect(navAbout).toBeInTheDocument();

  const navFavorite = getByRole('link', { name: /favorite pokémons/i });
  expect(navFavorite).toBeInTheDocument();
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

test('Ao clicar em Pokémons favoritados é redirecionado para "/favorites"', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('link', { name: /favorite pokémons/i }));

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Ao clicar em uma URL desconhecida é redirecionado para a página Not Found', () => {
  const { getByText, history } = renderWithRouter(<App />);

  history.push('/pagina-que-nao-existe');

  const notFound = getByText('Page requested not found');
  expect(notFound).toBeInTheDocument();
});
