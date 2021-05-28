import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

const poke = {
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
  summary: 'This intelligent Pokémon roasts hard berries with '
    + 'electricity to make them tender enough to eat.',
};

const falsePoke = false;
test('Se o tipo do Pokémon é renderizado na tela', () => {
  const { getByText, getByRole } = renderWithRouter(<Pokemon
    pokemon={ poke }
    isFavorite={ falsePoke }
  />);

  const name = getByText('Pikachu');
  expect(name).toBeInTheDocument();

  const testType = getByText('Electric');
  expect(testType).toBeInTheDocument();

  const weight = getByText('Average weight: 6.0 kg');
  expect(weight).toBeInTheDocument();

  const img = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
  const image = getByRole('img');
  expect(image.src).toBe(img);
  expect(image.alt).toBe('Pikachu sprite');
});

const truePoke = true;
test('Se existe um ícone de estrela no pokemon favoritado', () => {
  const { getAllByRole } = renderWithRouter(<Pokemon
    pokemon={ poke }
    isFavorite={ truePoke }
  />);
  const imgFavorite = '/star-icon.svg';
  const arrTestImg = getAllByRole('img');
  expect(arrTestImg[1].src).toMatch(imgFavorite);
  expect(arrTestImg[1].alt).toBe('Pikachu is marked as favorite');
});
test('Ao clicar no link de navegação do Pokémon, vai para detalhes', () => {
  const { getByRole, history } = renderWithRouter(<Pokemon
    pokemon={ poke }
    isFavorite={ falsePoke }
  />);
  userEvent.click(getByRole('link', { name: /more details/i }));
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});
