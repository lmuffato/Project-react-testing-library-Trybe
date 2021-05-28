import React from 'react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

const myPoke = {
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

const PokeRender = (isFavorite = false) => (<Pokemon
  pokemon={ myPoke }
  isFavorite={ isFavorite }
  showDetailsLink
/>);

test('Basic infos show', () => {
  const { getByTestId, getByRole } = renderWithRouter(PokeRender());

  const { innerHTML: pokemonName } = getByTestId('pokemon-name');
  const { innerHTML: pokemonType } = getByTestId('pokemon-type');
  const { innerHTML: pokemonWeight } = getByTestId('pokemon-weight');
  const { value, measurementUnit } = myPoke.averageWeight;
  const pokeImage = getByRole('img');
  expect(pokemonName).toBe(myPoke.name);
  expect(pokemonType).toBe(myPoke.type);
  expect(pokemonWeight).toBe(`Average weight: ${value} ${measurementUnit}`);
  expect(pokeImage.src).toBe(myPoke.image);
});

test('exibir detalhes deste Pokémon', () => {
  const { getByRole } = renderWithRouter(PokeRender());
  const details = getByRole('link');
  expect(details).toBeInTheDocument();
  expect(details.href).toMatch(`pokemons/${myPoke.id}`);
});
