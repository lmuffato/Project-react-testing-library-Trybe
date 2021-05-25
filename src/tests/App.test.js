import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

it('must have the links home, about and favorite respectively.', () => {
  const { getAllByRole } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const links = getAllByRole('link');
  expect(links[0]).toHaveTextContent('Home');
  expect(links[1]).toHaveTextContent('About');
  expect(links[2]).toHaveTextContent('Favorite Pokémons');
});

test('when click Home, the user is redirected to "/"', () => {
  const { getAllByRole, history } = renderWithRouter(<App />);

  const home = getAllByRole('link')[0];
  userEvent.click(home);
  const { location: { pathname } } = history;

  expect(pathname).toBe('/');
});

test('when click About, the user is redirected to "/about"', () => {
  const { getAllByRole, history } = renderWithRouter(<App />);

  const about = getAllByRole('link')[1];
  userEvent.click(about);
  const { location: { pathname } } = history;

  expect(pathname).toBe('/about');
});

test('when click Favorite Pokémons, the user is redirected to "/favorites"', () => {
  const { getAllByRole, history } = renderWithRouter(<App />);

  const favorite = getAllByRole('link')[2];
  userEvent.click(favorite);
  const { location: { pathname } } = history;

  expect(pathname).toBe('/favorites');
});

it('when user enter a incorrect URL shows the page Not Found', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pagina/que-nao-existe/');
  const noMatch = getByText(/Page requested not found/i);
  expect(noMatch).toBeInTheDocument();
});
