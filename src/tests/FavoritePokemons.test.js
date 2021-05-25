import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Verificar a página de Pokemons Favoritos', () => {
  // const pokemons = [
  //   {
  //     id: 25,
  //     name: 'Pikachu',
  //     type: 'Electric',
  //     averageWeight: {
  //       value: '6.0',
  //       measurementUnit: 'kg',
  //     },
  //     image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  //     moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  //     foundAt: [
  //       {
  //         location: 'Kanto Viridian Forest',
  //         map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
  //       },
  //       {
  //         location: 'Kanto Power Plant',
  //         map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
  //       },
  //     ],
  //     summary: 'This intelligent Pokémon roasts hard berries with'
  //     + ' electricity to make them tender enough to eat.',
  //   }];
  it('deve renderizar a pagina de favoritos vazia', () => {
    const { getByRole, getByText } = renderWithRouter(<FavoritePokemons />);
    const h2 = getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/i,
    });
    const paragraph2 = getByText('No favorite pokemon found');

    expect(h2).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
});
