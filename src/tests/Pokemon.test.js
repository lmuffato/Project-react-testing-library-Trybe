import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';

const favorite = {
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

test('O nome, tipo e peso corretos do Pokémon devem ser mostrados na tela', () => {
  renderWithRouter(<Pokemon pokemon={ favorite } isFavorite={ false } />);

  const pokemonName = screen.getByText(/Pikachu/i);
  expect(pokemonName).toBeInTheDocument();

  const pokemonType = screen.getByText(/Electric/i);
  expect(pokemonType).toBeInTheDocument();

  const pokemonWeight = screen.getByText('Average weight: 6.0 kg');
  expect(pokemonWeight).toBeInTheDocument();
});

test('link de navegação para exibir detalhes deste Pokémon, URL /pokemons/<id>', () => {
  const { getByRole, history } = renderWithRouter(<Pokemon
    pokemon={ favorite }
    isFavorite={ false }
  />);

  userEvent.click(getByRole('link', { name: /more details/i }));

  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('A imagem do Pokémon deve ser exibida', () => {
  renderWithRouter(<Pokemon pokemon={ favorite } isFavorite={ false } />);

  const imgSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
  const contain = screen.getByRole('img');
  expect(contain.src).toBe(imgSrc);
  expect(contain.alt).toBe('Pikachu sprite');
});

test('Pokémon favoritado e ícone de estrela na tela', () => {
  renderWithRouter(<Pokemon pokemon={ favorite } isFavorite />);

  const starIcon = screen.getByRole('img', {
    name: /pikachu is marked as favorite/i,
  });
  expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  expect(starIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
