// Agadecimento especial aos colegas Anderson Nascimento, Nilson Ribeiro, Adelino Junior, Luciano Amâncio, Marília, Lucas Lara, Beatriz Estebanez!
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
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

test('test if the main page is in the / url', () => {
  const { history, getByRole } = renderWithRouter(
    <App />,
  );
  expect(history.location.pathname).toBe('/');
  expect(getByRole('heading', {
    name: /encountered pokémons/i,
  })).toBeInTheDocument();
});

test('links have the referent text', () => {
  const { getByRole } = renderWithRouter(
    <App />,
  );
  expect(getByRole('link', { name: 'Home' })).toBeInTheDocument();
  expect(getByRole('link', { name: 'About' })).toBeInTheDocument();
  expect(getByRole('link', { name: 'Favorite Pokémons' })).toBeInTheDocument();
});
