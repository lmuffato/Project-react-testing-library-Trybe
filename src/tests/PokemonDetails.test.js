import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

test('Test 7.0', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const details = getByText(/More details/i);
  userEvent.click(details);
  expect(details).not.toBeInTheDocument();
  const headingDetails = getByRole('heading', {
    level: 2,
    name: `${pokemons[0].name} Details` });
  expect(headingDetails).toBeInTheDocument();
  const headingSummary = getByText(/Summary/i);
  expect(headingSummary).toBeInTheDocument();
  const textInfo = getByText(/This intelligent Pokémon roasts hard berries/i);
  expect(textInfo).toBeInTheDocument();
});
test('Test 7.1', () => {
  const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
  const details = getByText(/More details/i);
  userEvent.click(details);
  const headingLocations = getByRole('heading', {
    level: 2,
    name: `Game Locations of ${pokemons[0].name}` });
  expect(headingLocations).toBeInTheDocument();
  const imgMapLocation = getAllByAltText(`${pokemons[0].name} location`);
  expect(imgMapLocation.length).toBe(2);
  expect(imgMapLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(imgMapLocation[0].nextSibling).toHaveTextContent(/Kanto Viridian Forest/i);
  expect(imgMapLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(imgMapLocation[1].nextSibling).toHaveTextContent(/Kanto Power Plant/i);
});
test('Test 7.2', () => {
  const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);
  const details = getByText(/More details/i);
  userEvent.click(details);
  const checkFavorite = getByLabelText('Pokémon favoritado?');
  expect(checkFavorite).toBeInTheDocument();
  userEvent.click(checkFavorite);
  const imgStar = getByAltText(`${pokemons[0].name} is marked as favorite`);
  expect(imgStar).toBeInTheDocument();
  userEvent.click(checkFavorite);
  expect(imgStar).not.toBeInTheDocument();
});
