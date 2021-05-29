import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const renderAppWithRouter = () => renderWithRouter(<App />);
const allPokesChecker = (button, getByText) => {
  pokemons.forEach((poke) => {
    const pokeName = getByText(poke.name);
    expect(pokeName).toBeInTheDocument();
    userEvent.click(button);
  });
};

describe('Pokedex.test.js', () => {
  test('Exibe um h2 com "Encountered Pokémons" escrito', () => {
    const { getByRole } = renderAppWithRouter();
    const headingPokedex = getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2 });
    expect(headingPokedex).toBeInTheDocument();
  });
  test('Exibe um botão "próximo pokémon" e exibir todos os pokémons', () => {
    const { getByRole, getByText } = renderAppWithRouter();
    const nextPokemonButton = getByRole('button', { name: /próximo pokémon/i });
    pokemons.forEach((poke) => {
      const pokeName = getByText(poke.name);
      expect(pokeName).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
    });
  });
  test('Exibe apenas um pokemon por vez', () => {
    const { getAllByRole } = renderAppWithRouter();
    const pokeDiv = getAllByRole('generic').filter((el) => el.className === 'pokemon');
    expect(pokeDiv).toHaveLength(1);
  });
  test('Exibe filtros com todos os tipos de pokemóns cadastrados', () => {
    const { getByRole } = renderAppWithRouter();
    const types = pokemons.map((poke) => poke.type);
    types.forEach((type) => {
      const filterButton = getByRole('button', { name: type });
      expect(filterButton).toBeInTheDocument();
    });
  });
  test('Ao clicar em um filtro, exibe todos os pokémons do tipo do filtro', () => {
    const { getByRole, getByText } = renderAppWithRouter();
    const FireTypeButton = getByRole('button', { name: /fire/i });
    const nextButton = getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(FireTypeButton);
    const firePokemons = pokemons.filter((poke) => poke.type === 'Fire');
    firePokemons.forEach((poke) => {
      const pokeName = getByText(poke.name);
      expect(pokeName).toBeInTheDocument();
      userEvent.click(nextButton);
    });
  });
  test('Ao clicar no botão All aparecem todos os pokemons', () => {
    const { getByRole, getByText } = renderAppWithRouter();
    userEvent.click(getByRole('button', { name: /bug/i }));
    userEvent.click(getByRole('button', { name: /all/i }));
    const nextPokemon = getByRole('button', { name: /próximo pokémon/i });
    allPokesChecker(nextPokemon, getByText);
  });
  test('Ao iniciar a pagina, inicia sem filtro', () => {
    const { getByRole, getByText } = renderAppWithRouter();
    const nextPokemonButton = getByRole('button', { name: /próximo pokémon/i });
    allPokesChecker(nextPokemonButton, getByText);
  });
});
