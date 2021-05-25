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

  const homeLink = getByRole('link', {
    name: 'Home',
  });
  expect(homeLink).toBeInTheDocument();

  const aboutLink = getByRole('link', {
    name: 'About',
  });
  expect(aboutLink).toBeInTheDocument();

  const favPkmonLink = getByRole('link', {
    name: 'Favorite Pokémons',
  });
  expect(favPkmonLink).toBeInTheDocument();
});
