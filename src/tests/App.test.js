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
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const navigation = getByRole('navigation');
  expect(navigation).toBeInTheDocument();

  const navigationHome = getByRole('link', { name: /home/i });
  expect(navigationHome).toBeInTheDocument();

  const navigationAbout = getByRole('link', { name: /about/i });
  expect(navigationAbout).toBeInTheDocument();

  const navigationFav = getByRole('link', { name: /Favorite Pokémons/i });
  expect(navigationFav).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página inicial', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('link', { name: /home/i }));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Teste se a aplicação é redirecionada para a página de About', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('link', { name: /about/i }));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('link', { name: /Favorite Pokémons/i }));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('NotFound when not have a know url', () => {
  const { history, getByText } = renderWithRouter(<App />);

  history.push('/pageFail/');
  const textFail = getByText(/Page requested not found/i);
  expect(textFail).toBeInTheDocument();
});
