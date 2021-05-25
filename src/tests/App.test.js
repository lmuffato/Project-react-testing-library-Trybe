import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('renderiza três links de navegação no topo da página', () => {
  const { getByRole } = renderWithRouter(<App />);
  const link1 = getByRole('link', { name: 'Home' });
  expect(link1).toBeInTheDocument();
  const link2 = getByRole('link', { name: 'About' });
  expect(link2).toBeInTheDocument();
  const link3 = getByRole('link', { name: 'Favorite Pokémons' });
  expect(link3).toBeInTheDocument();
});

test('ao clicar no botão home, a aplicação é redirecionada para a home', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  const pathName = history.location.pathname;
  const buttonHome = getByRole('link', { name: 'Home' });
  userEvent.click(buttonHome);
  expect(pathName).toBe('/');
});
