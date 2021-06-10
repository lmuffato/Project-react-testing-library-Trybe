import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

/* test('renders a reading with the text `Pokédex`', () => {
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
}); */

describe('Requirement 1', () => {
  test('If home page renders', () => {
    const { getByText, history } = renderWithRouter(
      <App />,
    );
    const encounteredPokemons = getByText(/encountered pokémons/i);
    const { pathname } = history.location;
    expect(encounteredPokemons).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  test('If the links on the top are rendering', () => {
    const { getByRole } = renderWithRouter(
      <App />,
    );
    const homeLink = getByRole('link', { name: /home/i });
    const aboutLink = getByRole('link', { name: /about/i });
    const favoritePokemonsLink = getByRole('link', { name: /favorite Pokémons/i });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonsLink).toBeInTheDocument();
  });
});

// Caso não seja utilizado screen o getByRole deve ser declarado.
