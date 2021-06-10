import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

const pokemons = data.map((pokemon) => pokemon.name);
const NEXT_POKEMON = 'next-pokemon';
const POKEMON_NAME = 'pokemon-name';
test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const getHeading = getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });
  expect(getHeading).toBeInTheDocument();
});

test('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
  const { getByTestId, getByText } = renderWithRouter(<App />);
  const getButNextPokemon = getByTestId(NEXT_POKEMON);
  fireEvent.click(getButNextPokemon);
  const getTextButton = getByText('Próximo pokémon');
  expect(getTextButton).toBeInTheDocument();
  const getNextPokemon = getByTestId(POKEMON_NAME);
  expect(getNextPokemon).toBeInTheDocument();
});

test('Teste se é mostrado apenas um Pokémon por vez', () => {
  const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
  const allPokemons = getAllByTestId(POKEMON_NAME);
  expect(allPokemons.length).toBe(1);
  const getButNextPokemon = getByTestId(NEXT_POKEMON);
  fireEvent.click(getButNextPokemon);
  expect(allPokemons.length).toBe(1);
});

test('Teste se a Pokédex tem os botões de filtro.', () => {
  const { getAllByTestId, getByText, getByRole } = renderWithRouter(<App />);
  const getFilter = getAllByTestId('pokemon-type-button');
  const getFilterAll = getByText('All');
  const getButtonNextPokemon = getByRole('button', {
    name: 'Próximo pokémon',
  });
  for (let i = 0; i < getFilter.length; i += 1) {
    fireEvent.click(getFilter[i]);
    const getIdPokemon = getAllByTestId('pokemon-type');
    if (getFilter[i].textContent === 'Bug') {
      expect(getButtonNextPokemon).toHaveAttribute('disabled');
    }
    for (let j = 0; j < getIdPokemon.length; j += 1) {
      expect(getIdPokemon[j].textContent).toBe(getFilter[i].textContent);
      expect(getFilterAll).toBeInTheDocument();
    }
  }
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const getPokemons = pokemons;
  const { getByRole, getAllByTestId } = renderWithRouter(<App />);
  const getButtonAll = getByRole('button', {
    name: 'All',
  });
  expect(getButtonAll).toBeInTheDocument();
  fireEvent.click(getButtonAll);
  const getAllPokemons = getAllByTestId(POKEMON_NAME);
  for (let i = 0; i < getAllPokemons.length; i += 1) {
    expect(getAllPokemons[i].textContent).toBe(getPokemons[i]);
  }
});

test('Teste se a Pokédex contém um botão "All" para resetar o filtro', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const getTextAll = getByText('All');
  expect(getTextAll).toBeInTheDocument();
  const getButNextPokemon = getByTestId('next-pokemon');
  fireEvent.click(getButNextPokemon);
  const getPokemon = getByTestId('pokemon-name');
  expect(getPokemon).toBeInTheDocument();
  fireEvent.click(getButNextPokemon);
  const getCharmander = getByText('Caterpie');
  expect(getCharmander).toBeInTheDocument();
});
