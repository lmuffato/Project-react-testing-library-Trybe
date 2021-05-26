import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

const myPokemon = {
  id: 148,
  name: 'Dragonair',
  type: 'Dragon',
  averageWeight: {
    value: '16.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
};
const renderPokemon = () => (<Pokemon
  pokemon={ myPokemon }
  isFavorite={ false }
  showDetailsLink
/>);

describe('Pokemon component test', () => {
  test('Basic infos show', () => {
    renderWithRouter(renderPokemon());
    const { innerHTML: pokemonName } = screen.getByTestId('pokemon-name');
    const { innerHTML: pokemonType } = screen.getByTestId('pokemon-type');
    const { innerHTML: pokemonWeight } = screen.getByTestId('pokemon-weight');
    const { value, measurementUnit } = myPokemon.averageWeight;

    expect(pokemonName).toBe(myPokemon.name);
    expect(pokemonType).toBe(myPokemon.type);
    expect(pokemonWeight).toBe(`Average weight: ${value} ${measurementUnit}`);
  });
});
