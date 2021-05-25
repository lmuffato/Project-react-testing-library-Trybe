import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const favoritePokemons = [{ id: 25, name: 'Pikachu', type: 'Electric', averageWeight: { value: '6.0', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)', foundAt: [{ location: 'Kanto Viridian Forest', map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' }, { location: 'Kanto Power Plant', map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }], summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.' }];

describe('testing FavoritePokemons component', () => {
  it('testing with no favorite pokemon', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const text = getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });
  it('test the pokemon card', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons
      pokemons={ favoritePokemons }
    />);
    const pokemonCard = getByText('Pikachu');
    expect(pokemonCard).toBeInTheDocument();
  });
});
