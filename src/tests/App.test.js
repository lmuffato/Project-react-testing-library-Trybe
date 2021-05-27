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

  const about = getByText(/about/i);
  expect(about).toBeInTheDocument();

  const favorite = getByText(/Favorite Pokémons/i);
  expect(favorite).toBeInTheDocument();
});
