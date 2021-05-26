import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('shows pokemon pokemon details', () => {
  const { getByRole, getAllByAltText, getByAltText } = renderWithRouter(<App />);

  const detailsLink = getByRole('link', {
    name: 'More details',
  });

  userEvent.click(detailsLink);

  const nameDetails = getByRole('heading', {
    level: 2,
    name: 'Pikachu Details',
  });

  const summary = getByRole('heading', {
    level: 2,
    name: 'Summary',
  });

  const gameLocations = getByRole('heading', {
    level: 2,
    name: 'Game Locations of Pikachu',
  });

  const info = screen.getByText(/Pokémon roasts hard berries with electricity/i);
  const pokemonImg = getAllByAltText('Pikachu location');
  const url = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
  const url2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
  const mapInfo = screen.getByText('Kanto Viridian Forest');
  const mapInfo2 = screen.getByText('Kanto Power Plant');
  const checkBox = getByRole('checkbox', {
    name: 'Pokémon favoritado?',
  });

  expect(nameDetails).toBeInTheDocument();
  expect(detailsLink).not.toBeInTheDocument();
  expect(summary).toBeInTheDocument();
  expect(info).toBeInTheDocument();
  expect(pokemonImg[0].src).toBe(url);
  expect(pokemonImg[1].src).toBe(url2);
  expect(gameLocations).toBeInTheDocument();
  expect(mapInfo).toBeInTheDocument();
  expect(mapInfo2).toBeInTheDocument();
  expect(checkBox).toBeInTheDocument();

  userEvent.click(checkBox);

  const favIcon = getByAltText('Pikachu is marked as favorite');

  expect(favIcon).toBeInTheDocument();

  userEvent.click(checkBox);

  expect(favIcon).not.toBeInTheDocument();
});
