import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
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

test('O primeiro link deve possuir o texto Home', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const linkToHome = screen.getByRole('link', { name: /Home/i });

  expect(linkToHome).toBeInTheDocument();
});

test('O segundo link deve possuir o texto About', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const linkToHome = screen.getByRole('link', { name: /About/i });

  expect(linkToHome).toBeInTheDocument();
});

test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const linkToHome = screen.getByRole('link', { name: /Favorite Pokémons/i });

  expect(linkToHome).toBeInTheDocument();
});
