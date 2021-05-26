import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
const renderPokemon = (isFavorite = false) => (<Pokemon
  pokemon={ myPokemon }
  isFavorite={ isFavorite }
  showDetailsLink
/>);

describe('Pokemon component test', () => {
  test('Basic infos show', () => {
    renderWithRouter(renderPokemon());
    const { innerHTML: pokemonName } = screen.getByTestId('pokemon-name');
    const { innerHTML: pokemonType } = screen.getByTestId('pokemon-type');
    const { innerHTML: pokemonWeight } = screen.getByTestId('pokemon-weight');
    const { value, measurementUnit } = myPokemon.averageWeight;
    const pokemonImage = screen.getByRole('img');

    expect(pokemonName).toBe(myPokemon.name);
    expect(pokemonType).toBe(myPokemon.type);
    expect(pokemonWeight).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonImage.src).toBe(myPokemon.image);
  });

  test('more details link', () => {
    renderWithRouter(renderPokemon());
    const moreDetails = screen.getByRole('link');
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails.href).toMatch(`pokemons/${myPokemon.id}`);
  });

  test('On More Details click go to more details page', () => {
    const { history } = renderWithRouter(renderPokemon());
    const moreDetails = screen.getByRole('link');
    userEvent.click(moreDetails);
    const { pathname } = history.location;

    expect(pathname).toBe(`/pokemons/${myPokemon.id}`);
  });

  test('Favorite star shows ', () => {
    renderWithRouter(renderPokemon(true));
    const starImage = screen.getByAltText(`${myPokemon.name} is marked as favorite`);

    expect(starImage).toBeInTheDocument();
    expect(starImage.src).toMatch('/star-icon.svg');
  });
});
