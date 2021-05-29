import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  // https://testing-library.com/docs/example-react-router/#reducing-boilerplate
  render(<App />, { wrapper: MemoryRouter });

  const home = screen.getByText(/Home/);
  expect(home).toBeInTheDocument();

  const about = screen.getByText(/About/);
  expect(about).toBeInTheDocument();

  const favoritePokes = screen.getByText(/Favorite Pokémons/);
  expect(favoritePokes).toBeInTheDocument();
});

// Utilizando getByRole ao invés do screen, funciona das duas formas
test('should redirect to / when click on Home', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('link', { name: /Home/ }));

  const { pathname } = history.location;

  expect(pathname).toBe('/');
});

test('should redirect to /about when click on About', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('link', { name: /About/ }));

  const { pathname } = history.location;

  expect(pathname).toBe('/about');
});

test('should redirect to /favorites when click on Favorites Pokémons', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('link', { name: /Favorite Pokémons/ }));

  const { pathname } = history.location;

  expect(pathname).toBe('/favorites');
});

test('should redirect to /favorites when click on Favorites Pokémons', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/page/not-found');
  expect(screen.getByText(/page requested not found/i)).toBeInTheDocument();
});
