import React from 'react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('Teste se é exibido na tela a mensagem No favorite pokemon found,'
+ 'se a pessoa não tiver pokémons favoritos', () => {
  render(
    <BrowserRouter>
      <FavoritePokemons />
    </BrowserRouter>,
  );

  const display = screen.getByText('No favorite pokemon found');
  expect(display).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados', () => {
  const { getByRole } = renderWithRouter(<App />);

  const pokemonDetails = getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(pokemonDetails);

  const checkbox = getByRole('checkbox', {
    name: /pokémon favoritado\?/i,
  });
  userEvent.click(checkbox);

  const favoritedImg = getByRole('img', {
    name: /Pikachu is marked as favorite/i,
  });
  expect(favoritedImg).toBeInTheDocument();
});

test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
  const favorite = [
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
      summary: 'This intelligent Pokémon roasts hard'
      + 'berries with electricity to make them tender enough to eat.',
    },
  ];

  const notFavorite = [
    {
      id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: {
        value: '8.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Alola Route 3',
          map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
        },
        {
          location: 'Kanto Route 3',
          map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
        },
        {
          location: 'Kanto Route 4',
          map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
        },
        {
          location: 'Kanto Rock Tunnel',
          map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
        },
      ],
      summary: 'The flame on its tail shows the strength of its life force.'
      + 'If it is weak, the flame also burns weakly.',
    },
  ];

  renderWithRouter(<FavoritePokemons pokemons={ favorite } />);

  notFavorite.forEach((pokemon) => {
    expect(screen.queryByText(pokemon.name)).not.toBeInTheDocument();
  });
});
