import React from 'react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a Heading with the text `Pokédex`', () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});
test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <BrowserRouter initialEntries={ ['/'] }>
      <App />
    </BrowserRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
test('shows the "home","about","favorite Pokemons" link ', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const homeLink = screen.getByRole('link', {
    name: /Home/i,
  });
  const aboutLink = screen.getByRole('link', {
    name: /About/i,
  });
  const favoriteLink = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  expect(favoriteLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(homeLink).toBeInTheDocument();
});
test('shows the correct URL by clicking the links', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const homeLink = screen.getByRole('link', {
    name: /Home/i,
  });
  userEvent.click(homeLink);
  const homeHeading = screen.getByRole('heading', {
    name: /Encountered pokémons/i,
    level: 2,
  });
  expect(homeHeading).toBeInTheDocument();

  const aboutLink = screen.getByRole('link', {
    name: /About/i,
  });

  userEvent.click(aboutLink);

  const aboutHeading = screen.getByRole('heading', {
    name: /About Pokédex/i,
    level: 2,
  });
  expect(aboutHeading).toBeInTheDocument();

  const favoriteLink = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  userEvent.click(favoriteLink);

  const favoriteHeading = screen.getByRole('heading', {
    name: /Favorite pokémons/i,
    level: 2,
  });

  expect(favoriteHeading).toBeInTheDocument();
});
test('shows "not found" page by access an unknow URL', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  history.push('/rota-que-não-existe');

  const notFoundText = getByRole('heading', {
    name: /Page requested not found/i,
    level: 2,
  });

  expect(notFoundText).toBeInTheDocument();
});
