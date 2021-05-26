import React from 'react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

const pokemons = {
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
  summary: 'This intelligent Pokémon roasts hard berries with'
    + 'electricity to make them tender enough to eat.',
};

test('information about pokemon card', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<Pokemon
    pokemon={ pokemons }
    isFavorite={ false }
  />);

  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent(/pikachu/i);
  const pokemonType = getByTestId('pokemon-type');
  expect(pokemonType).toHaveTextContent(/electric/i);
  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  const pokemonImg = getByAltText('Pikachu sprite');
  expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('show more details link', () => {
  const { getByRole } = renderWithRouter(<Pokemon
    pokemon={ pokemons }
    isFavorite={ false }
  />);

  const moreDetailsLink = getByRole('link', {
    name: /more details/i,
  });
  expect(moreDetailsLink).toBeInTheDocument();
  expect(moreDetailsLink).toHaveAttribute('href', '/pokemons/25');
});

test('shows the star icon', () => {
  const { getByAltText } = renderWithRouter(<Pokemon
    pokemon={ pokemons }
    isFavorite
  />);

  const icon = getByAltText(/pikachu is marked as favorite/i);
  expect(icon).toHaveAttribute('src', '/star-icon.svg');
});
