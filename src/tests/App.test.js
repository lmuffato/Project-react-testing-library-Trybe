import React from 'react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
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
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const myNav = getByRole('navigation');
  expect(myNav).toBeInTheDocument();
});

test('Testa se existe um link com o texto Home', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const myLink = getByRole('link', {
    name: /Home/i,
  });
  userEvent.click(myLink);

  const homeText = getByRole('heading', {
    name: /Encountered pokémons/i,
    level: 2,
  });

  expect(homeText).toBeInTheDocument();
});

test('Testa se existe um link com o texto About', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const myLink = getByRole('link', {
    name: /About/i,
  });
  userEvent.click(myLink);

  const aboutText = getByRole('heading', {
    name: /About Pokédex/i,
    level: 2,
  });

  expect(aboutText).toBeInTheDocument();
});

test('Testa se existe um link com o texto Favorite Pokémons', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  const myLink = getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  userEvent.click(myLink);

  const favoriteText = getByRole('heading', {
    name: /Favorite pokémons/i,
    level: 2,
  });

  expect(favoriteText).toBeInTheDocument();
});

test('Testa se o usuario e direcionado para notFound `/desconhecido`', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  history.push('/desconhecido');

  const notFoundText = getByRole('heading', {
    name: /Page requested not found Crying emoji/i,
    level: 2,
  });

  expect(notFoundText).toBeInTheDocument();
});
