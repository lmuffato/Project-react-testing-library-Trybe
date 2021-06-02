import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createBrowserHistory } from 'history';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('testa conjunto de link', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeLink = screen.getByRole('link', {
    name: 'Home',
  });
  const aboutLink = screen.getByRole('link', {
    name: 'About',
  });
  const favoriteLink = screen.getByRole('link', {
    name: 'Favorite Pokémons',
  });

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoriteLink).toBeInTheDocument();
});

test('testa o redirecionamento de links', () => {
  const historyMock = createBrowserHistory();
  render(
    <Router history={ historyMock }>
      <App />
    </Router>,
  );
  const homeLink = screen.getByRole('link', {
    name: 'Home',
  });
  const aboutLink = screen.getByRole('link', {
    name: 'About',
  });
  const favoriteLink = screen.getByRole('link', {
    name: 'Favorite Pokémons',
  });

  const funcLink = (link) => {
    userEvent.click(link);
    return historyMock.location.pathname;
  };

  const aboutPathname = funcLink(aboutLink);
  expect(aboutPathname).toEqual('/about');

  const favoritePathname = funcLink(favoriteLink);
  expect(favoritePathname).toEqual('/favorites');

  const homePathname = funcLink(homeLink);
  expect(homePathname).toEqual('/');
});
