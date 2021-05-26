import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const match = {
  path: '/pokemons/:id',
  url: '/pokemons/25',
  isExact: true,
  params: {
    id: '25',
  },
};

test('renders Pokedex and execute all functions', () => {
  const history = createMemoryHistory();
  history.push(match.url);
  const { getByRole, getByText, getAllByRole } = render(
    <Router history={ history }>
      <PokemonDetails
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ match }
      />
    </Router>,
  );

  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');

  const name = getByRole('heading', { name: /Pikachu Details/i });
  expect(name).toBeInTheDocument();

  const summary = getByRole('heading', { name: /Summary/i });
  const summaryTxt = getByText(/This intelligent Pokémon/i);
  expect(summary).toBeInTheDocument();
  expect(summaryTxt).toBeInTheDocument();

  const habitat = getByRole('heading', { name: /Game Locations of Pikachu/i });
  const habitatmap = getAllByRole('img', { name: /Pikachu location/i });
  expect(habitat).toBeInTheDocument();
  expect(habitatmap[0].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(habitatmap[1].src).toContain('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

  const favorito = getByRole('checkbox', { name: /Pokémon favoritado?/i });
  expect(favorito).toBeInTheDocument();
});
