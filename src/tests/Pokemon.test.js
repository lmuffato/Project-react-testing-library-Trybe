// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

const pokemon = {
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
  summary: 'This intelligent Pokémon roasts hard berries.',
};

describe('Testando Component Pokemon', () => {
  test('O nome a imagem e o tipo do Pokemon devem ser mostrados na tela', () => {
    const { getByText, getByAltText } = renderWithRouter(<Pokemon pokemon={ pokemon } />);
    const pickachu = getByText(pokemon.name);
    expect(pickachu).toBeInTheDocument();
    expect(getByText(pokemon.type)).toBeInTheDocument();
    const img = getByAltText(`${pokemon.name} sprite`);
    expect(img).toBeInTheDocument();
    const { averageWeight: { measurementUnit } } = pokemon;
    const weight = getByText(
      `Average weight: ${pokemon.averageWeight.value} ${measurementUnit}`,
    );
    expect(weight).toBeInTheDocument();
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
    const { getByText, history } = renderWithRouter(<Pokemon pokemon={ pokemon } />);
    const link = getByText('More details');
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
  });
});
