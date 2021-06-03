import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

import { PokemonDetails } from '../components';
import App from '../App';
import pokemons from '../data';

const simulatedFavoritePokemons = pokemons.reduce((ids, { id }) => {
  ids[id] = false;
  return ids;
}, {});

const updateFavoritePokemons = jest.fn();

function rendering(id) {
  const matchMock = {
    params: {
      id,
    },
  };

  return renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ simulatedFavoritePokemons }
      match={ matchMock }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ (pokemonId, isFavorite) => (
        updateFavoritePokemons(pokemonId, isFavorite)
      ) }
    />,
  );
}

describe('7 - Testing the component <PokekmonDetails />', () => {
  const pokemonsInfo = pokemons.map((pokemon, index) => [pokemon, index]);

  test.each(pokemonsInfo)('details of the pokémon must show in screen',
    ({ id, name, summary }) => {
      rendering(`${id}`);

      const pokemonName = screen.getByTestId('pokemon-name').textContent;
      const noDetailsLink = screen.queryByTestId('link', { name: /more details/i });

      const summaryHeading = screen.getByRole('heading', {
        name: /summary/i,
        level: 2,
      });

      const pokemonHeading = screen.getByRole('heading', {
        name: `${pokemonName} Details`,
      }).textContent;

      const pokemonSummary = summaryHeading.nextSibling.textContent;

      expect(pokemonHeading).toBe(`${name} Details`);
      expect(noDetailsLink).not.toBeInTheDocument();
      expect(summaryHeading).toBeInTheDocument();
      expect(pokemonSummary).toBe(summary);
    });

  test.each(pokemonsInfo)('maps must show pokémons locations',
    ({ id, foundAt, name }) => {
      rendering(`${id}`);

      const pokemonName = screen.getByTestId('pokemon-name').textContent;

      const locationHeading = screen.getByRole('heading', {
        name: `Game Locations of ${pokemonName}`,
      });

      const pokemonLocations = screen.getAllByRole('img', {
        name: `${pokemonName} location`,
      });

      foundAt.forEach(({ location, map }, index) => {
        const currentMap = pokemonLocations[index];
        const currentLocation = currentMap.nextSibling.textContent;

        expect(currentLocation).toBe(location);
        expect(currentMap.attributes.src.value).toBe(map);
        expect(currentMap.alt).toBe(`${name} location`);
      });

      expect(locationHeading).toBeInTheDocument();
      expect(pokemonLocations.length).toBe(foundAt.length);
    });

  test.each(pokemonsInfo)('user can bookmark a pokemon through the details page.',
    ({ id }) => {
      const { history } = renderWithRouter(<App />);

      history.push(`/pokemons/${id}`);

      const checkbox = screen.getByLabelText('Pokémon favoritado?');
      expect(checkbox).toBeInTheDocument();

      userEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);

      userEvent.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });
});
