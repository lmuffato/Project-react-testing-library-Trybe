import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const mockPkm = {
  id: pokemons[0].id,
  image: pokemons[0].image,
  moreInfo: pokemons[0].moreInfo,
  name: pokemons[0].name,
  summary: pokemons[0].summary,
  type: pokemons[0].type,
  averageWeight: {
    measurementUnit: pokemons[0].averageWeight.measurementUnit,
    value: pokemons[0].averageWeight.value,
  },
};

test('page renders a card with information of one Pokémon', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/');

  const { measurementUnit, value } = mockPkm.averageWeight;

  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent(mockPkm.name);

  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType).toHaveTextContent(mockPkm.type);

  const pokemonWeight = screen.getByTestId('pokemon-weight');
  expect(pokemonWeight).toHaveTextContent(
    `Average weight: ${value} ${measurementUnit}`,
  );

  const imagePath = screen.getByAltText(`${mockPkm.name} sprite`);
  expect(imagePath.src).toBe(mockPkm.image);
});

test('card contains a navigation link to PokemonDetails page', () => {
  const { history, getByRole } = renderWithRouter(<App />);

  const linkDetailsPage = getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(linkDetailsPage);
  expect(history.location.pathname).toBe(`/pokemons/${mockPkm.id}`);
});
