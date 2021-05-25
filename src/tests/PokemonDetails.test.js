import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PokemonDetails } from '../components';
import data from '../data';

describe('tests the pokemon details component', () => {
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
    const match = {
      path: '/pokemons/:id',
      url: '/pokemons/25',
      isExact: true,
      params: { id: '25' },
    };
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
});
