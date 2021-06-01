import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const heading = getByRole('heading', {
    name: /Pokédex/i,
    level: 1,
  });
  expect(heading).toBeInTheDocument();
});

describe('tests navigation links', () => {
  test('home link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkHome = getByText(/home/i);
    userEvent.click(linkHome);
  });

  test('about link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkAbout = getByText(/about/i);
    userEvent.click(linkAbout);
  });
});
