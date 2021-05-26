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
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { getByText, getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const navigation = getByText('navigation');
  expect(navigation).toBeInTheDocument();

  const navigationHome = getByText('link', { nome: /home/i });
  expect(navigationHome).toBeInTheDocument();

  const navigationAbout = getByRole('link', { nome: /about/i });
  expect(navigationAbout).toBeInTheDocument();

  const navigationFav = getByText('link', { nome: /Favorite Pokémons/i });
  expect(navigationFav).toBeInTheDocument();
});
