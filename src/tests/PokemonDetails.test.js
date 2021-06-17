// trecho realizado em parceria com Anderson Silva
import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { PokemonDetails } from '../components';
import renderWithRouter from './RenderWithRouter';

describe('testando component details pokemons', () => {
  test('test detalhes component', () => {
    const { getByText,
      getAllByRole,
      getByRole,
      getByLabelText } = renderWithRouter(<App 
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
        }] } />);

    const textButton = getByText(/more details/i);
    userEvent.click(textButton);

    const map1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const map2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const mapsPoke = getAllByRole('img');
    expect(mapsPoke[1].src).toBe(map1);
    expect(mapsPoke[1].alt).toBe('Pikachu location');
    expect(mapsPoke[2].src).toBe(map2);
    expect(mapsPoke[2].alt).toBe('Pikachu location');

    const namePoke = getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    expect(namePoke).toBeInTheDocument();

    const summaryH2 = getByRole('heading', { name: /summary/i });
    expect(summaryH2).toBeInTheDocument();

    const textSummary = 'This intelligent Pokémon roasts hard berries with '
    + 'electricity to make them tender enough to eat.';
    const testSummaryText = getByText(textSummary);
    expect(testSummaryText).toBeInTheDocument();

    const inputFavorite = getByLabelText('Pokémon favoritado?');
    expect(inputFavorite).toBeInTheDocument();

    const h2Text = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(h2Text).toBeInTheDocument();

    const nameText = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(nameText).toBeInTheDocument();
  });

  // test('test h2', () => {
  //   renderWithRouter(<PokemonDetails />);
  //   const h2Text = screen.getByRole('heading', {
  //     name: /summary/i,
  //     level: 2,
  //   });
  //   expect(h2Text).toBeInTheDocument();
  // });
});
