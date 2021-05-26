import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Assure that header has three links', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const homeLink = screen.getByRole('link', {
    name: /home/i
  });
  const aboutLink = screen.getByRole('link', {
    name: /about/i
  })
  const favoritePokemonsLink = screen.getByRole('link', {
    name: /Favorite Pokémons/i
  })

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoritePokemonsLink).toBeInTheDocument();
});

test('Applications links redirect correctely', async () => {
  const historyMock = createMemoryHistory();
  render(
    <Router history={ historyMock }>
      <App />
    </Router>
  );

  const homeLink = screen.getByRole('link', {
    name: /home/i
  });
  const aboutLink = screen.getByRole('link', {
    name: /about/i
  });
  const favoritePokemonsLink = screen.getByRole('link', {
    name: /Favorite Pokémons/i
  });
  
  userEvent.click(aboutLink);
  const aboutText = screen.getByRole('heading', {
    name: /about pokédex/i,
    level: 2
  });
  expect(aboutText).toBeInTheDocument();

  userEvent.click(favoritePokemonsLink);
  const favoritesText = screen.getByRole('heading', {
    name: /Favorite pokémons/i,
    level: 2
  });
  expect(favoritesText).toBeInTheDocument();

  userEvent.click(homeLink);
  const homeText = screen.getByRole('heading', {
    name: /Encountered pokémons/i,
    level: 2
  });
  expect(homeText).toBeInTheDocument();

  historyMock.push('/pagina-nao-definida');
  const { pathname } = historyMock.location;
  const textNotFound = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i
  })
  expect(pathname).toEqual('/pagina-nao-definida');
  expect(textNotFound).toBeInTheDocument();
});
