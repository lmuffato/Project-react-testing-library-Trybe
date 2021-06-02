import React from 'react';
import renderWithRouter from './RenderWithRouter';
import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

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
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('renders home when loading the URL path `/`', () => {
  const { history:{ location:{ pathname } } } = renderWithRouter((<App />));
  expect(pathname).toBe('/');
});

test('page header contains nav links `home`, `about` and `favorite`', () => {
  renderWithRouter((<App />));
  const nav = screen.getByRole('navigation');
  expect(nav).toBeInTheDocument();

  const home = screen.getByRole('link', {
    name: /home/i,
  });
  expect(home).toBeInTheDocument();

  const about = screen.getByRole('link', {
    name: /about/i,
  });
  expect(about).toBeInTheDocument();

  const favorite = screen.getByRole('link', {
    name: /favorite/i,
  });
  expect(favorite).toBeInTheDocument();
});

describe('redirection tests', () => {
  test('clicking on `Home` redirects to `/`', () => {
    const { history:{ location:{ pathname } } } = renderWithRouter((<App />));
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);
    expect(pathname).toBe('/');
  })

  test('clicking on `About` redirects to `/about`', () => {
    const { history } = renderWithRouter((<App />));
    const about = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  })

  test('clicking on `Favorite Pokémons` redirects to `/favorites`', () => {
    const { history } = renderWithRouter((<App />));
    const favorite = screen.getByRole('link', {
      name: /favorite/i,
    });
    userEvent.click(favorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  })

  test('redirects to Not Found on clicking on an unknown URL', () => {
    const { history } = renderWithRouter((<App />));
    history.push('/random');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  })
})
