import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

import { Pokemon } from '../components';
import pokemons from '../data';

function rendering(index, favorites) {
  const higherThanHalf = 0.5;
  let isFavorite;

  switch (favorites) {
  case 'TRUE':
    isFavorite = true;
    break;
  case 'FALSE':
    isFavorite = false;
    break;
  default:
    isFavorite = Math.random() > higherThanHalf;
    break;
  }

  return renderWithRouter(
    <Pokemon pokemon={ pokemons[index] } isFavorite={ isFavorite } />,
  );
}

// https://dev.to/bgord/simplify-repetitive-jest-test-cases-with-test-each-310m
describe('6 - Testing the component <Pokemon />', () => {
  const pokemonsInfo = pokemons.map((pokemon, index) => [pokemon, index]);

  test.each(pokemonsInfo)('the card must has each pokemon info right',
    ({ name, type, averageWeight: { value, measurementUnit }, image }, index) => {
      rendering(index);
      const cardName = screen.getByTestId('pokemon-name').textContent;
      const cardType = screen.getByTestId('pokemon-type').textContent;
      const cardImage = screen.getByRole('img', { name: `${cardName} sprite` });
      const cardAvarageWeight = screen.getByTestId('pokemon-weight').textContent;

      expect(cardName).toBe(name);
      expect(cardType).toBe(type);
      expect(cardAvarageWeight).toBe(`Average weight: ${value} ${measurementUnit}`);
      expect(cardImage.src).toBe(image);
      expect(cardImage.alt).toBe(`${name} sprite`);
    });

  test.each(pokemonsInfo)('link url must has the pokemon id',
    ({ id }, index) => {
      rendering(index);

      const details = screen.getByRole('link', { name: /more details/i });
      expect(details.pathname).toBe(`/pokemons/${id}`);
    });

  test.each(pokemonsInfo)('the details link must go to the pokemon page info',
    ({ id }, index) => {
      const { history } = rendering(index);

      const details = screen.getByRole('link', { name: /more details/i });
      userEvent.click(details);

      const { location: { pathname } } = history;

      expect(pathname).toBe(`/pokemons/${id}`);
    });

  test.each(pokemonsInfo)('favorite pokemons must has a star icon',
    ({ name }, index) => {
      rendering(index, 'TRUE');

      const cardStar = document.querySelector('.favorite-icon');

      expect(cardStar.attributes.src.value).toBe('/star-icon.svg');
      expect(cardStar.alt).toBe(`${name} is marked as favorite`);
    });
});
