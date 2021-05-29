import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';

const pokeMock = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [{
    location: 'Kanto Viridian Forest',
    map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
  },
  {
    location: 'Kanto Power Plant',
    map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
  }],
  summary: 'This intelligent Pokémon roasts hard'
  + 'berries with electricity to make them tender enough to eat.',
}];

describe('Test component <FavoritePokemons />', () => {
  test('Test "no favorite pokemon"', () => {
    const { getByRole, getByText } = renderWithRouter(<FavoritePokemons />);
    const heading = getByRole('heading', { name: /favorite pokémons/i });
    expect(heading).toBeInTheDocument();
    const noPokeFound = getByText(/no favorite pokemon found/i);
    expect(noPokeFound).toBeInTheDocument();
  });
  test('Test cards of favorite pokemons', () => {
    const { getByTestId } = renderWithRouter(<FavoritePokemons pokemons={ pokeMock } />);
    const pokeName = getByTestId('pokemon-name');
    const pokeType = getByTestId('pokemon-type');
    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeName.innerHTML).toBe('Pikachu');
    expect(pokeType.innerHTML).toBe('Electric');
    expect(pokeWeight.innerHTML).toBe('Average weight: 6.0 kg');
  });
});
