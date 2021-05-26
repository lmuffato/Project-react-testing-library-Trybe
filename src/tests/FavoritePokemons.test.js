import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const favoritePokemonsOn = [
  {
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
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  },
];

const favoritePokemonsNone= [];

describe('testes do componente Favorite Pokemons', () => {
  test('testes gerais da página de favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemonsNone } />);

    const noFavoritesText = screen.getByText('No favorite pokemon found');
    expect(noFavoritesText).toBeInTheDocument();
  });

  test('teste de pokémon favorito', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemonsOn } />);

    const favPokemons = screen.getByRole('heading',
      { level: 2, name: /favorite pokémons/i },
    );
    expect(favPokemons).toBeInTheDocument();
    const pikachuImg = screen.getByAltText('Pikachu sprite');
    expect(pikachuImg).toBeInTheDocument();
  });
});
