import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

const pokemonMock = {
  id: 10,
  name: 'Caterpie',
  type: 'Bug',
  averageWeight: {
    value: '2.9',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Johto Route 30',
      map: 'https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
    },
    {
      location: 'Johto Route 31',
      map: 'https://cdn2.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
    },
    {
      location: 'Ilex Forest',
      map: 'https://cdn2.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
    },
    {
      location: 'Johto National Park',
      map: 'https://cdn2.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
    },
  ],
  summary: `For protection, it releases a horrible stench from 
    the antennae on its head to drive away enemies.`,
};

describe('Testa o componente "Pokemon"', () => {
  it(`Teste se é renderizado um card com 
  as informações de determinado pokémon`, () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemonMock } isFavorite={ false } />,
    );

    const pokeName = getByText('Caterpie');
    const pokeType = getByText('Bug');
    const pokeWeight = getByText('Average weight: 2.9 kg');
    const pokeImage = getByRole('img');

    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeImage.src).toBe('https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png');
    expect(pokeImage.alt).toBe('Caterpie sprite');
  });

  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação 
    para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, 
    onde <id> é o id do Pokémon exibido`, () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon pokemon={ pokemonMock } isFavorite={ false } />,
    );

    userEvent.click(getByRole('link', 'More details'));
    const pathPokemon = history.location.pathname;

    expect(pathPokemon).toBe('/pokemons/10');
  });
});
