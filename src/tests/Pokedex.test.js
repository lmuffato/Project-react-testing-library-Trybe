import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokedex } from '../components';

describe('testando componente Pokedex', () => {
  const isPokemonFavoriteById = { 1: false, 2: false };
  const pokemons = [
    {
      id: 1,
      name: 'Ekans',
      type: 'Poison',
      averageWeight: { value: '6.9', measurementUnit: 'kg' },
      image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Goldenrod Game Corner',
          map: 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
        },
      ],
      summary: 'olá mundo.',
    },
    {
      id: 2,
      name: 'Pikachu',
      type: 'Eletric',
      averageWeight: { value: '6.9', measurementUnit: 'kg' },
      image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Goldenrod Game Corner',
          map: 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
        },
      ],
      summary: 'olá mundo.',
    },
  ];
  test('testando se existe um h2 na home da aplicação e seu texto correspondente', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      isPokemonFavoriteById={ isPokemonFavoriteById }
      pokemons={ pokemons }
    />);
    const titleHome = getByRole('heading', { level: 2 });
    expect(titleHome).toBeInTheDocument();
    expect(titleHome).toHaveTextContent('Encountered pokémons');
  });

  test('testando se ao clicar no botão next, renderiza outro pokemon', () => {
    const { getByTestId, getByText } = renderWithRouter(<Pokedex
      isPokemonFavoriteById={ isPokemonFavoriteById }
      pokemons={ pokemons }
    />);
    const nextButton = getByTestId('next-pokemon');
    expect(nextButton).toHaveTextContent('Próximo pokémon');
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
    const nextPokemon = getByText('Pikachu');
    expect(nextPokemon).toBeInTheDocument();
  });
  test('testando botao poison', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<Pokedex
      isPokemonFavoriteById={ isPokemonFavoriteById }
      pokemons={ pokemons }
    />);
    const poisonButton = getByRole('button', { name: 'Poison' });
    expect(poisonButton).toBeInTheDocument();
    userEvent.click(poisonButton);
    const pokemonTipeButton = getAllByTestId('pokemon-type-button');
    expect(pokemonTipeButton[0]).toBeInTheDocument();
  });
  test('testando botão All', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      isPokemonFavoriteById={ isPokemonFavoriteById }
      pokemons={ pokemons }
    />);
    const allButton = getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
  });
  test('testando função filterPokemons', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      isPokemonFavoriteById={ isPokemonFavoriteById }
      pokemons={ pokemons }
    />);
    const allButton = getByRole('button', { name: 'All' });
    userEvent.click(allButton);
    expect(pokemons.length).toBe(2);
  });
});
