import React from 'react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

test('show "No favorite pokemon found" if there are no favorite pokemons', () => {
  render(
    <BrowserRouter>
      <FavoritePokemons />
    </BrowserRouter>,
  );
  const notFoundText = screen.getByText('No favorite pokemon found');
  expect(notFoundText).toBeInTheDocument();
});

test('show the favortie pokemons when have one', () => {
  const pikachu = [{
    id: 25,
    averageWeight: {
      measurementUnit: 'kg',
      value: '6.0',
    },
    foundAt: [{
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    }, {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',

    }],

    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    name: 'Pikachu',
    summary: 'This intelligent Pokémon roasts hard berries with electricity'
    + 'to make them tender enough to eat.',
    type: 'Electric',
  }];
  render(
    <BrowserRouter>
      <FavoritePokemons pokemons={ pikachu } />
    </BrowserRouter>,
  );

  const pikachuText = screen.getByText('Pikachu');
  expect(pikachuText).toBeInTheDocument();
});
