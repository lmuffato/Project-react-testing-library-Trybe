import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { FavoritePokemons } from '../components';

const favoritePokemons = [{
  id: 4,
  name: 'Charmander',
  type: 'Fire',
  averageWeight: {
    value: '8.5', measurementUnit: 'kg' },
  image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
  foundAt: [{ location: 'Alola Route 3', map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png' }],
  summary: `The flame on its tail shows the strength of its life force.
If it is weak, the flame also burns weakly.`,
}];

test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
  const { getByText } = render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );

  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados', () => {
  const { getByText } = render(
    <MemoryRouter>
      <FavoritePokemons pokemons={ favoritePokemons } />
    </MemoryRouter>,
  );

  const pokemonCard = getByText('Charmander');
  expect(pokemonCard).toBeInTheDocument();
});
