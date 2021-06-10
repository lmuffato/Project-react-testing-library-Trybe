import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

const MORE_DETAILS = 'More details';

test('Teste se as informações detalhadas do Pokémon são mostradas na tela.', () => {
  const { name, summary } = pokemons[0];
  const { getByRole, getByText } = renderWithRouter(<App />);
  const getMoreDetails = getByRole('link', { name: MORE_DETAILS });
  fireEvent.click(getMoreDetails);
  const getTextTitle = getByText(`${name} Details`);
  expect(getTextTitle).toBeInTheDocument();

  const getSummary = getByRole('heading', {
    level: 2,
    name: 'Summary',
  });
  expect(getSummary).toBeInTheDocument();

  const getTextSummary = getByText(summary);
  expect(getTextSummary).toBeInTheDocument();
});

test('Teste se contém os mapas na página de localizações do pokémon', () => {
  const { name, foundAt } = pokemons[0];
  const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
  const getMoreDetails = getByRole('link', { name: 'More details' });
  fireEvent.click(getMoreDetails);
  const getLocation = getByRole('heading', {
    level: 2,
    name: `Game Locations of ${name}`,
  });
  expect(getLocation).toBeInTheDocument();

  const getAllLocations = getAllByAltText(`${name} location`);
  expect(getAllLocations.length).toBe(2);
  expect(getAllLocations[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png', 'alt', `${name} location`);
  expect(getAllLocations[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png', 'alt', `${name} location`);

  foundAt.forEach((obj) => {
    const getLoc = getByText(obj.location);
    expect(getLoc).toBeInTheDocument();
  });
});

test('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const getMoreDetails = getByRole('link', { name: MORE_DETAILS });
  fireEvent.click(getMoreDetails);
  const getButtonFavorites = getByText('Pokémon favoritado?');
  expect(getButtonFavorites).toBeInTheDocument();
  const getButton = getByRole('checkbox');
  fireEvent.click(getButton);
  expect(getButton).toBeChecked();
  fireEvent.click(getButton);
  expect(getButton).not.toBeChecked();
});
