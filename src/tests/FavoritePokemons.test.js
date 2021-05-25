import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('renders Favorite Pokemon with no favorite pokemons', () => {
  const { getByRole, getByText } = render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );
  const heading = getByRole('heading', { name: 'Favorite pokémons' });
  const paragraph1 = getByText(/No favorite pokemon found/i);

  expect(heading).toBeInTheDocument();
  expect(paragraph1).toBeInTheDocument();
});

test('renders Favorite Pokemon with favorite pokemons', () => {
  const pokemons = [{
    averageWeight: { value: '6.0', measurementUnit: 'kg' },
    id: 25,
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    name: 'Pikachu',
    type: 'Electric',
  }];
  const { getByRole, getByText } = render(
    <MemoryRouter>
      <FavoritePokemons pokemons={ pokemons } />
    </MemoryRouter>,
  );
  const star = getByRole('img', { name: 'Pikachu is marked as favorite' });
  const name = getByText(/Pikachu/i);

  expect(star).toBeInTheDocument();
  expect(name).toBeInTheDocument();
});
