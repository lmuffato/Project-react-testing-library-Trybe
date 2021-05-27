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

  const home = getByRole('link', {
    name: /home/i,
  });
  expect(home).toBeInTheDocument();

  const about = getByRole('link', {
    name: /About/i,
  });
  expect(about).toBeInTheDocument();

  const favPokemon = getByRole('link', {
    name: /favorite pokémon/i,
  });
  expect(favPokemon).toBeInTheDocument();
});
