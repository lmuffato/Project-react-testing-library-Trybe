import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../renderWithRouter';
import { PokemonDetails } from '../components';
import data from '../data';

const pokemons = data;

const favoritePokemon = {
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

const params = {
  id: '25',
};
const match = {
  params,
  path: '/pokemons/:id',
  url: '/pokemons/25',
  isExact: true,
};

describe('7 - Test the <PokemonDetails.js /> component', () => {
  it('The page must contain a text <name>', () => {
    const { getByRole, getByText, getAllByRole } = renderWithRouter(
      <MemoryRouter>
        <PokemonDetails
          isPokemonFavoriteById={ favoritePokemon }
          match={ match }
          onUpdateFavoritePokemons={
            (id, isFavorite) => (this.onUpdateFavoritePokemons(id, isFavorite))
          }
          pokemons={ pokemons }
        />
      </MemoryRouter>,
    );
    const { params: { id } } = match;
    const title = getByRole('heading', { name: /pikachu details/i, level: 2 });
    expect(title).toBeInTheDocument();

    const summary = getByRole('heading', { name: /summary/i, level: 2 });
    expect(summary).toBeInTheDocument();

    const p = getByText('This intelligent Pokémon roasts hard berries with'
        + ' electricity to make them tender enough to eat.');
    expect(p).toBeInTheDocument();

    const titleGame = getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(titleGame).toBeInTheDocument();

    const pokemon = pokemons.find((pItem) => pItem.id === parseInt(id, 10));
    const { foundAt } = pokemon;

    const maps = getAllByRole('img', { name: /pikachu location/i });

    foundAt.forEach(({ map, location }) => {
      const locText = getByText(location);
      expect(locText).toBeInTheDocument();
      expect(maps).toHaveLength(foundAt.length);

      const mapEl = maps.find((m) => m.src === map);
      expect(mapEl).toHaveAttribute('src', map);
    });

    const checkbox = getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(checkbox).toBeInTheDocument();
  });
});
