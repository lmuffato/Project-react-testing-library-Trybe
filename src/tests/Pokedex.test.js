import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

test('Tests Pokedex', () => {
  const favorites = pokemons.reduce((acc, pokemon) => {
    acc[pokemon.id] = false;
    return acc;
  }, {});

  const history = createBrowserHistory();

  const { getByRole } = render(
    <Router history={ history }>
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />
    </Router>,
  );

  expect(getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  })).toBeInTheDocument();
});

test('Tests next Pokemon', () => {
  const favorites = pokemons.reduce((acc, pokemon) => {
    acc[pokemon.id] = false;
    return acc;
  }, {});

  const history = createBrowserHistory();

  const { getByRole, getByText } = render(
    <Router history={ history }>
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />
    </Router>,
  );

  const nextPokeBtn = getByRole('button', { name: 'Próximo pokémon' });

  for (let counter = 0; counter < pokemons.length; counter += 1) {
    expect(getByText(pokemons[counter].name)).toBeInTheDocument();
    userEvent.click(nextPokeBtn);
    const nextPoke = (counter === pokemons.length - 1) ? 0 : counter + 1;
    expect(getByText(pokemons[nextPoke].name)).toBeInTheDocument();
  }
});

test('Tests if there\'s only 1 pokemon', () => {
  const favorites = pokemons.reduce((acc, pokemon) => {
    acc[pokemon.id] = false;
    return acc;
  }, {});

  const history = createBrowserHistory();

  const { getAllByText } = render(
    <Router history={ history }>
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />
    </Router>,
  );

  expect(getAllByText('More details').length).toBe(1);
});

test('Tests filter buttons and All filter', () => {
  const favorites = pokemons.reduce((acc, pokemon) => {
    acc[pokemon.id] = false;
    return acc;
  }, {});

  const history = createBrowserHistory();

  const { getByRole, getAllByText } = render(
    <Router history={ history }>
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />
    </Router>,
  );

  const psychicBtn = getByRole('button', { name: 'Psychic' });
  const allBtn = getByRole('button', { name: 'All' });
  expect(getAllByText('Psychic').length).toBe(1);
  userEvent.click(psychicBtn);
  expect(getAllByText('Psychic').length).toBe(2);
  userEvent.click(allBtn);
  expect(getAllByText('Psychic').length).toBe(1);
});

test('Tests Dynamic creation of pokemon type filter buttons', () => {
  const favorites = pokemons.reduce((acc, pokemon) => {
    acc[pokemon.id] = false;
    return acc;
  }, {});

  const history = createBrowserHistory();

  const { getAllByTestId, getByRole } = render(
    <Router history={ history }>
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />
    </Router>,
  );

  const allBtn = getByRole('button', { name: 'All' });
  expect(allBtn).toBeInTheDocument();

  const typeButtons = getAllByTestId('pokemon-type-button');
  const types = pokemons.reduce((acc, { type }) => {
    acc.push(type);
    return acc;
  }, []);

  typeButtons.forEach((button) => {
    expect(types).toContain(button.textContent);
  });
});

test('Tests NextPokemon button disabled if there\'s only 1 pokemon', () => {
  const favorites = pokemons.reduce((acc, pokemon) => {
    acc[pokemon.id] = false;
    return acc;
  }, {});

  const history = createBrowserHistory();

  const [firstPoke] = pokemons;

  const { getByRole } = render(
    <Router history={ history }>
      <Pokedex
        pokemons={ [firstPoke] }
        isPokemonFavoriteById={ favorites }
      />
    </Router>,
  );

  const nextPokeBtn = getByRole('button', { name: 'Próximo pokémon' });
  expect(nextPokeBtn).toBeDisabled();
});
