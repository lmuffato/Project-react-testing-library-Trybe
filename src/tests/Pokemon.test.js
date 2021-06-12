import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';
// import { Pokemon } from '../components';

test('Test 6.0', () => {
  const { getByTestId, getByRole, getByAltText } = renderWithRouter(<App />);
  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent(/Pikachu/i);
  const pokemonType = getByTestId('pokemon-type');
  expect(pokemonType).toHaveTextContent(/Electric/i);
  const averageWeight = getByTestId('pokemon-weight');
  const value = '6.0';
  const measurementUnit = 'kg';
  expect(averageWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  const pokemonImage = getByRole('img'); // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
  expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  const pokemonImageText = getByAltText(/Pikachu sprite/i);
  expect(pokemonImageText).toBe(pokemonImage);
});
test('Test 6.1', () => {
  const { getByRole } = renderWithRouter(<App />);
  const pikachuLink = getByRole('link', { name: /More details/i });
  const id = '25';
  expect(pikachuLink.href).toBe(`http://localhost/pokemons/${id}`);
});
test('Test 6.2', () => {
  const { getByText } = renderWithRouter(<App />);
  const pikachuLink = getByText(/More details/i);
  userEvent.click(pikachuLink);
  const id = '25';
  expect(pikachuLink.href).toBe(`http://localhost/pokemons/${id}`);
  expect(pikachuLink.pathname).toBe('/pokemons/25');
});
test('Test 6.2', () => {
  const { getAllByRole, getByRole, getByAltText } = renderWithRouter(<App />);
  const pikachuImage = getAllByRole('img');
  expect(pikachuImage.length).toBe(1);
  const pikachuLink = getByRole('link', { name: /More details/i });
  expect(pikachuLink).toBeInTheDocument();
  userEvent.click(pikachuLink);
  const id = '25';
  expect(pikachuLink.href).toBe(`http://localhost/pokemons/${id}`);
  const checkFavorite = getByRole('checkbox', { checked: false });
  userEvent.click(checkFavorite);
  expect(checkFavorite).toBeTruthy();
  const imgStar = getByAltText(`${pokemons[0].name} is marked as favorite`);
  expect(imgStar).toBeInTheDocument();
  expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
});
