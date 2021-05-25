import React from 'react';
import { MemoryRouter } from 'react-router-dom';
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

test('renders home, about and favorite pokémons links', () => {
  const { getByRole } = renderWithRouter(<App />);

  const homeLink = getByRole('link', {
    name: /home/i,
  });
  const aboutLink = getByRole('link', {
    name: /about/i,
  });
  const favoriteLink = getByRole('link', {
    name: /favorite pokémons/i,
  });
  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoriteLink).toBeInTheDocument();
});
