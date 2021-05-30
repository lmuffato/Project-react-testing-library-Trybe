import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();

  const home = getByText(/home/i);
  expect(home).toBeInTheDocument();

  const about = getByText(/about/i);
  expect(about).toBeInTheDocument();

  const fav = getByText(/favorite pokémons/i);
  expect(fav).toBeInTheDocument();
});
