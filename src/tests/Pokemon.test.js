import React from 'react';
import Pokemon from '../components/Pokemon';
import isPokemonFavoriteById from '../isPokemonFavorite-data';
import renderWithRouter from '../renderWithRouter';

const pokeMock = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them'
  + ' tender enough to eat.',
};

describe('Pokemon Tests', () => {
  it('Test if have pokemon name', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokeMock }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const pokeName = getByText(/pikachu/i);
    expect(pokeName).toBeInTheDocument();

    const testType = getByText('Electric');
    expect(testType).toBeInTheDocument();

    const testWeight = getByText('Average weight: 6.0 kg');
    expect(testWeight).toBeInTheDocument();

    const image = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const testImgt = getByRole('img');
    expect(testImgt.alt).toBe('Pikachu sprite');
    expect(testImgt.src).toBe(image);
  });

  const isPokemonFavoriteTrue = true;

  it('Test if have start in favorite pokemon', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokeMock }
        isPokemonFavoriteById={ isPokemonFavoriteTrue }
      />,
    );
    const imageFavorite = '/star-icon.svg';
    const arrayTestImage = getAllByRole('img');
    expect(arrayTestImage.src).toMatch(imageFavorite);
    expect(arrayTestImage[1].alt).toBe('Pikachu is marked as favorite');
  });
});
