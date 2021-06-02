import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './render.WithRouter';

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('test 1.1', () => {
  const { history: { location: { pathname } } } = renderWithRouter(<App />);
  expect(pathname).toBe('/');
});

test('test 1.2', () => {
  const { getByRole } = renderWithRouter(<App />);
  const nav = getByRole('navigation');
  const n = 3;
  expect(nav.children.length).toBe(n);
});

test('test 1.3', () => {
  const { getByRole } = renderWithRouter(<App />);
  const nav = getByRole('navigation');
  expect(nav.children[0].innerHTML).toBe('Home');
});

test('test 1.3.1', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const link = getAllByRole('link');
  expect(link[0].innerHTML).toBe('Home');
  expect(link[0].href).toBe('http://localhost/');
});

test('test 1.4', () => {
  const { getByRole } = renderWithRouter(<App />);
  const nav = getByRole('navigation');
  expect(nav.children[1].innerHTML).toBe('About');
});

test('test 1.4.1', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const link = getAllByRole('link');
  expect(link[1].innerHTML).toBe('About');
  expect(link[1].href).toBe('http://localhost/about');
});

test('test 1.5', () => {
  const { getByRole } = renderWithRouter(<App />);
  const nav = getByRole('navigation');
  expect(nav.children[2].innerHTML).toBe('Favorite Pokémons');
});

test('test 1.5.1', () => {
  const { getAllByRole } = renderWithRouter(<App />);
  const link = getAllByRole('link');
  expect(link[2].innerHTML).toBe('Favorite Pokémons');
  expect(link[2].href).toBe('http://localhost/favorites');
});

test('test 1.6', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pagina/que-nao-existe');
  const noMatch = getByText('Page requested not found');
  expect(noMatch.innerHTML).toContain('Page requested not found');
});
