import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

test('testando se renderiza a mensagem de sem pokemons favoritados', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const noPokemons = getByText('No favorite pokemon found');
  expect(noPokemons).toBeInTheDocument();
  const pokemons = [
    {
      id: 23,
      name: 'Ekans',
      type: 'Poison',
      averageWeight: { value: '6.9', measurementUnit: 'kg' },
      image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Goldenrod Game Corner',
          map: 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
        },
      ],
      summary: 'olá mundo.',
    },
  ];
  const
    { getByTestId, getByAltText } = renderWithRouter(<FavoritePokemons
      pokemons={ pokemons }
    />);
  const imagePokemon = getByAltText('Ekans sprite');
  const pokemonType = getByTestId('pokemon-type');
  const pokemonName = getByTestId('pokemon-name');

  expect(imagePokemon.src).toBe('https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png');
  expect(pokemonName).toHaveTextContent('Ekans');
  expect(pokemonType).toHaveTextContent('Poison');
});
