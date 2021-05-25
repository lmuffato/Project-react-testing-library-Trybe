import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('página principal da Pokédex é renderizada ao carregar a aplicação em /`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Encountered pokémons/i);
  expect(heading).toBeInTheDocument();
});
