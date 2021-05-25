import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText, getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();

  const linkHome = getByRole('link', {
    name: 'Home',
  });
  expect(linkHome).toBeInTheDocument();

  const linkAbout = getByRole('link', {
    name: 'About',
  });
  expect(linkAbout).toBeInTheDocument();

  const linkFavoritePokemons = getByRole('link', {
    name: 'Favorite Pokémons',
  });
  expect(linkFavoritePokemons).toBeInTheDocument();
});
