import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PokemonDetails } from '../components';
import data from '../data';

describe('tests the pokemon details component', () => {
  const match = {
    path: '/pokemons/:id',
    url: '/pokemons/25',
    isExact: true,
    params: { id: '25' },
  };
  const pokemons = data;
  const pokemonFavorite = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false };
  test('test whether basic information is rendered', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <PokemonDetails
          pokemons={ pokemons }
          match={ match }
          isPokemonFavoriteById={ pokemonFavorite }
          onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
            this.onUpdateFavoritePokemons(pokemonId, isFavorite)
          ) }
        />
      </MemoryRouter>,
    );

    const { summary } = pokemons
      .find((pokemon) => pokemon.id === Number(match.params.id));

    const nameDetails = getByRole('heading', { name: 'Pikachu Details', level: 2 });
    const summaryHeading = getByRole('heading', { name: 'Summary', level: 2 });
    const pokemonResumed = getByText(summary);

    expect(nameDetails).toBeInTheDocument();
    expect(summaryHeading).toBeInTheDocument();
    expect(pokemonResumed).toBeInTheDocument();
  });
  test('test whether maps section is rendered', () => {
    const { getAllByRole, getByRole, getByText } = render(
      <MemoryRouter>
        <PokemonDetails
          pokemons={ pokemons }
          match={ match }
          isPokemonFavoriteById={ pokemonFavorite }
          onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
            this.onUpdateFavoritePokemons(pokemonId, isFavorite)
          ) }
        />
      </MemoryRouter>,
    );
    const pokemon = pokemons
      .find((pokemonItem) => pokemonItem.id === Number(match.params.id));

    const { name, foundAt } = pokemon;

    const sectionMap = getByRole('heading',
      { name: `Game Locations of ${name}`, level: 2 });
    expect(sectionMap).toBeInTheDocument();

    const mapElement = getAllByRole('img', { name: `${name} location` });

    foundAt.forEach(({ map, location }) => {
      const locationElement = getByText(location);
      expect(locationElement).toBeInTheDocument();

      expect(mapElement).toHaveLength(foundAt.length);

      const mapImage = mapElement.find((mapItem) => mapItem.src === map);
      expect(mapImage).toHaveAttribute('src', map);
    });
  });
  test('test if pokemon favorited checkbox', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <PokemonDetails
          pokemons={ pokemons }
          match={ match }
          isPokemonFavoriteById={ pokemonFavorite }
          onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
            this.onUpdateFavoritePokemons(pokemonId, isFavorite)
          ) }
        />
      </MemoryRouter>,
    );
    const favoriteCheck = getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favoriteCheck).toBeInTheDocument();
  });
});
