import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

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

test('Testing Home link', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const homeLink = getByText(/home/i);
  expect(homeLink).toBeInTheDocument();
  fireEvent.click(homeLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Testing About link', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const homeLink = getByText(/About/i);
  expect(homeLink).toBeInTheDocument();
  fireEvent.click(homeLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Testing `Favorite Pokémon` link', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const homeLink = getByText(/Favorite Pokémon/i);
  expect(homeLink).toBeInTheDocument();
  fireEvent.click(homeLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});
