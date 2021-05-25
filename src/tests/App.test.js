import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
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

it('testa se o primeiro link contém o texto "Home"', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Home/i);
  expect(home).toBeInTheDocument();
});

it('testa se o primeiro link contém o texto "About"', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/About/i);
  expect(home).toBeInTheDocument();
});

it('testa se o primeiro link contém o texto "Favorite Pokémons"', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/Favorite Pokémons/i);
  expect(home).toBeInTheDocument();
});