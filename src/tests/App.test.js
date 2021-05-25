import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
// import userEvent from '@testing-library/user-event';
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

test('testa se o primeiro link contém o texto "Home"', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Home/i);
  expect(home).toBeInTheDocument();
});

test('testa se o primeiro link contém o texto "About"', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/About/i);
  expect(home).toBeInTheDocument();
});

test('testa se o primeiro link contém o texto "Favorite Pokémons"', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Favorite Pokémons/i);
  expect(home).toBeInTheDocument();
});
