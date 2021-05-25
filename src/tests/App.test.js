import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
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
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Top of the application contains a fixed set of navigation links', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const linkHome = screen.getByRole('link', {
    name: /home/i,
  });
  const linkAbout = screen.getByRole('link', {
    name: /about/i,
  });
  const linkFavPokemons = screen.getByRole('link', {
    name: /favorite pokémons/i,
  });

  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
  expect(linkFavPokemons).toBeInTheDocument();
});

test('app is redirected to the home page, by click on the Home link in the nav bar.',
  () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });

    userEvent.click(linkHome);

    const text = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    });

    expect(text).toBeInTheDocument();
  });

test('app is redirected to about page, by click on the About link in the nav bar', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const linkAbout = screen.getByRole('link', {
    name: /about/i,
  });

  userEvent.click(linkAbout);

  const textAbout = screen.getByRole('heading', {
    name: /About Pokédex/i,
  });

  expect(textAbout).toBeInTheDocument();
});

test('app is redirected to fav page, by click on the Fav link in the nav bar', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const linkFav = screen.getByRole('link', {
    name: /favorite pokémons/i,
  });

  userEvent.click(linkFav);

  const textFav = screen.getByRole('heading', {
    name: /Favorite pokémons/i,
  });

  expect(textFav).toBeInTheDocument();
});

test('app is redirected to not found page, by entering an unknown URL.', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  history.push('/xablau');

  const notFoundText = getByRole('heading', {
    name: /Page requested not found/i,
  });

  expect(notFoundText).toBeInTheDocument();
});
