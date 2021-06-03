import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
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
test('Test 1.1', () => {
  const { history: { location: { pathname } } } = renderWithRouter(<App />);
  expect(pathname).toBe('/');
});
test('Test 1.2', () => {
  const { getByRole } = renderWithRouter(<App />);
  const navigation = getByRole('navigation');
  console.log(navigation.children[0].href);
  expect(navigation.children[0].innerHTML).toBe('Home');
  expect(navigation.children[1].innerHTML).toBe('About');
  expect(navigation.children[2].innerHTML).toBe('Favorite Pokémons');
});
test('Test 1.3', () => {
  const { getByText } = renderWithRouter(<App />);
  const homeText = getByText('Home');
  userEvent.click(homeText);
  expect(homeText).toBeInTheDocument();
});
test('Test 1.4', () => {
  const { getByText } = renderWithRouter(<App />);
  const aboutText = getByText('About');
  userEvent.click(aboutText);
  expect(aboutText).toBeInTheDocument();
});
test('Test 1.5', () => {
  const { getByText } = renderWithRouter(<App />);
  const favoriteText = getByText('Favorite Pokémons');
  userEvent.click(favoriteText);
  expect(favoriteText).toBeInTheDocument();
});
