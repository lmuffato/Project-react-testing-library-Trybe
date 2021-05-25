import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
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

test('redirects to "/" when render and click on "home"', () => {
  const history = createMemoryHistory();
  const { getByText, getByRole } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const home = getByText(/Home/i);
  expect(home).toBeInTheDocument();

  userEvent.click(home);

  const { pathname } = history.location;
  expect(pathname).toBe('/');

  const homeTitle = getByRole('heading', { name: 'Encountered pokémons' });
  expect(homeTitle).toBeInTheDocument();
});

test('redirects to "/about" when render and click on "About"', () => {
  const history = createMemoryHistory();
  const { getByText, getByRole } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const about = getByText(/About/i);
  expect(about).toBeInTheDocument();

  userEvent.click(about);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');

  const pokedextite = getByRole('heading', { name: 'About Pokédex' });
  expect(pokedextite).toBeInTheDocument();
});

test('redirects to "/favorites" when render and click on "Favorite Pokemon"', () => {
  const history = createMemoryHistory();
  const { getByText, getByRole } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const favorite = getByText(/Favorite Pokémons/i);
  expect(favorite).toBeInTheDocument();

  userEvent.click(favorite);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');

  const favTitle = getByRole('heading', { name: 'Favorite pokémons' });
  expect(favTitle).toBeInTheDocument();
});

test('redirects to "not found" when a non exixtent route is defined', () => {
  const history = createMemoryHistory();
  const route = 'naoexisto';
  history.push(route);
  const { getByText } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );

  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
