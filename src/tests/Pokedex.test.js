import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
// import { Pokedex } from '../components';
import App from '../App';

test('Test 5.0', () => {
  const { getByRole, getByText, getByAltText } = renderWithRouter(<App />);
  const headingText = getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
  expect(headingText).toBeInTheDocument();
  const nextButton = getByText(/Próximo pokémon/i);
  // const textButton = getByTestId('next-pokemon');
  const pikachuCard = getByAltText('Pikachu sprite');
  expect(pikachuCard).toBeInTheDocument();
  userEvent.click(nextButton);
  const charmanderCard = getByAltText('Charmander sprite');
  expect(charmanderCard).toBeInTheDocument();
});
test('Test 5.1', () => {
  const { getByText } = renderWithRouter(<App />);
  const pokemonDetails = getByText(/More details/i);
  expect(pokemonDetails).toBeInTheDocument();
  const nextButton = getByText(/Próximo pokémon/i);
  userEvent.click(nextButton);
  expect(pokemonDetails).toBe(pokemonDetails);
});
test('Test 5.2', () => {
  const { getByRole, getByAltText, getByText } = renderWithRouter(<App />);
  const buttonFire = getByRole('button', { name: 'Fire' });
  userEvent.click(buttonFire);
  const charmanderCard = getByAltText('Charmander sprite');
  expect(charmanderCard).toBeInTheDocument();
  const nextButton = getByText(/Próximo pokémon/i);
  userEvent.click(nextButton);
  const rapidashCard = getByAltText('Rapidash sprite');
  expect(rapidashCard).toBeInTheDocument();
});
test('Test 5.3', () => {
  const { getByRole, getByAltText } = renderWithRouter(<App />);
  const buttonPoison = getByRole('button', { name: 'Poison' });
  userEvent.click(buttonPoison);
  const ekansCard = getByAltText('Ekans sprite');
  expect(ekansCard).toBeInTheDocument();
  const buttonAll = getByRole('button', { name: 'All' });
  userEvent.click(buttonAll);
  const pikachuCard = getByAltText('Pikachu sprite');
  expect(pikachuCard).toBeInTheDocument();
});
test('Test 5.3', () => {
  const { getAllByTestId, getByRole } = renderWithRouter(<App />);
  const filter = getAllByTestId('pokemon-type-button');
  const filterNumbers = 7;
  expect(filter.length).toBe(filterNumbers);
  const buttonAll = getByRole('button', { name: 'All' });
  expect(buttonAll).toBeEnabled();
});
test('Test 5.3', () => {
  const { getByRole, getByAltText, getByText } = renderWithRouter(<App />);
  const buttonPoison = getByRole('button', { name: 'Poison' });
  userEvent.click(buttonPoison);
  const ekansCard = getByAltText('Ekans sprite');
  expect(ekansCard).toBeInTheDocument();
  const nextButton = getByText(/Próximo pokémon/i);
  expect(nextButton).toBeDisabled();
});
