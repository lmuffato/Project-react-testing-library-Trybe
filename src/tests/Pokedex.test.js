import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';

describe('Test \'Pokedex\' component', () => {
  const pokemons = [{
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
    summary: 'This intelligent Pokémon roasts hard berries'
      + 'with electricity to make them tender enough to eat.',
  }];
  const isPokemonFavoriteById = { 25: false };
  
  it('Test heading \'Encountered pokémons\'', async () => {
    const { getByText, getByRole } = await renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });
});
