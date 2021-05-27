import React from 'react';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import App from '../App';

test('tests return of application details', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/About Pokédex/i);
  expect(heading).toBeInTheDocument();
});
