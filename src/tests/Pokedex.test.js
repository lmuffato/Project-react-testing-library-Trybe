import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const renderAppWithRouter = () => renderWithRouter(<App />);
const newPokemonType = {
  id: 54,
  name: 'Psyduck',
  type: 'Water',
  averageWeight: {
    value: '19.6',
    measurementUnit: 'kg',
  },
  image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Psyduck_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Seafoam Islands',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'its the best pokemon',
};
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
    const { getAllByTestId } = renderAppWithRouter();
    const types = [/electric/i,
      /fire/i,
      /bug/i,
      /poison/i,
      /psychic/i, /normal/i, /dragon/i];
    const typeButtons = getAllByTestId('pokemon-type-button');
    for (let index = 0; index < typeButtons.length; index += 1) {
      expect(typeButtons[index]).toHaveTextContent(types[index]);
    }
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
  test('botões de filtragem devem ser dinâmicos', () => {
    pokemons.push(newPokemonType);
    const { getByRole } = renderAppWithRouter();
    const waterFilterButton = getByRole('button', { name: /water/i });
    expect(waterFilterButton).toBeInTheDocument();
  });
});
