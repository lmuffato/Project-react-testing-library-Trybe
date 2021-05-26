import React from 'react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

test('heading has espefic text', () => {
  const { getByRole } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  );
  const title = getByRole('heading',
    {
      name: /Encountered pokémons/i,
      level: 2,
    });
  expect(title).toBeInTheDocument();
});

test('next pokemon is shown after click', () => {
  const { getByText } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  );
  const btn = getByText(/Próximo pokémon/i);
  expect(getByText('Pikachu')).toBeInTheDocument();
  userEvent.click(btn);
  expect(getByText('Charmander')).toBeInTheDocument();
});

test('is shown only one pokemon', () => {
  const { getAllByTestId } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  );
  const pokemonLength = getAllByTestId('pokemon-name').length;
  expect(pokemonLength).toBe(1);
});

test('pokedex has a filter button', () => {
  const { getByText } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  );
  const fireBtn = getByText(/Fire/i);
  userEvent.click(fireBtn);
  expect(getByText('Charmander')).toBeInTheDocument();
  const nextBtn = getByText(/Próximo pokémon/i);
  userEvent.click(nextBtn);
  expect(getByText('Rapidash')).toBeInTheDocument();
});

test('pokedex has a reset filter button', () => {
  const { getByText } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  );
  const allButton = getByText(/All/i);
  userEvent.click(allButton);
  expect(getByText('Pikachu')).toBeInTheDocument();
  const nextButton = getByText(/Próximo pokémon/i);
  userEvent.click(nextButton);
  expect(getByText('Charmander')).toBeInTheDocument();
});

test('dynamically creates a filter button', () => {
  const { getByText, getAllByTestId } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  );
  const allTypes = ['Eletric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  expect(getAllByTestId('pokemon-type-button').length).toBe(allTypes.length);
  expect(getByText(/All/i)).toBeInTheDocument();
});

test('"Próximo pokémon" button must be disabled when there is one pokemon', () => {
  const { getByText, getByRole } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  );
  const eletricButton = getByRole('button', { name: /Electric/i });
  userEvent.click(eletricButton);
  const nextButton = getByText(/Próximo pokémon/i);
  expect(nextButton).toBeDisabled();
});
