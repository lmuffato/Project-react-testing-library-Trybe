import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './RenderWithRouter';

// código realizado em parceria com Anderson Silva
describe('Testes pagina favorite pokemons', () => {
  test('teste se exibe testo padrao', () => {
    renderWithRouter(<FavoritePokemons
      pokemons={ [{
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
      }] }
    />);

    const renderPokemon = screen.getByText(/Pikachu/i);

    expect(renderPokemon).toBeInTheDocument();
  });

  test('teste no found', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const noPokemon = screen.getByText(/no favorite pokemon found/i);

    expect(noPokemon).toBeInTheDocument();
  });
});
