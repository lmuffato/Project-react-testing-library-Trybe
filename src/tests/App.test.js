import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

it('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

it('renders a "home" page with the text "encountered pokémons"', () => {
  const { getByRole } = renderWithRouter(<App />);
  const home = getByRole('heading', { name: /encountered pokémons/i, level: 2 });
  expect(home).toBeInTheDocument();
});

it('renders a "home" page with pathname "/"', () => {
  const { history } = renderWithRouter(<App />);
  const historyPath = history.location.pathname;
  expect(historyPath).toBe('/');
});

it(`renders a list of 3 links with the text:
 "Home", "About" and "Favorite Pokémons"`, () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const nav = getAllByRole('link');
  expect(nav).toBeDefined();
});

it('should render the component "Home"', () => {
  const { history, getByRole } = renderWithRouter(<App />);
  const homeLink = getByRole('link', { name: /home/i });
  userEvent.click(homeLink);
  const historyPath = history.location.pathname;
  expect(historyPath).toBe('/');
});

it('should render the component "About"', () => {
  const { history, getByRole } = renderWithRouter(<App />);
  const aboutLink = getByRole('link', { name: /about/i });
  userEvent.click(aboutLink);
  const historyPath = history.location.pathname;
  const aboutPage = getByRole('heading', { name: /about pokédex/i, level: 2 });
  expect(historyPath).toBe('/about');
  expect(aboutPage).toBeInTheDocument();
});

it('should render the component "Favorite Pokémons"', () => {
  const { history, getByRole } = renderWithRouter(<App />);
  const favPokemonsLink = getByRole('link', { name: /favorite pokémons/i });
  userEvent.click(favPokemonsLink);
  const historyPath = history.location.pathname;
  const favPokemonsPage = getByRole('heading', { name: /favorite pokémons/i, level: 2 });
  expect(historyPath).toBe('/favorites');
  expect(favPokemonsPage).toBeInTheDocument();
});

it('should render the component "not found"', () => {
  const { history, getByRole } = renderWithRouter(<App />);
  history.push('/route-not-found');
  const notFoundText = getByRole('heading',
    { name: /page requested not found/i, level: 2 });
  expect(notFoundText).toBeInTheDocument();
});
