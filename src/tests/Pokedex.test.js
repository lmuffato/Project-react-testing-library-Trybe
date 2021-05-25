import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import alias from './utils/alias';
import renderWithRouter from './utils/renderWithRouter';

import App from '../App';

describe('Testes para o componente "Pokedex.js"', () => {
  const { expectToBeInTheDocument } = alias;
  const btnNextPokemon = () => screen.getByTestId('next-pokemon');
  const pokemonName = () => screen.getByTestId('pokemon-name');
  const pokemonType = () => screen.getByTestId('pokemon-type');

  test('A página contém um heading "h2" com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    expectToBeInTheDocument(
      screen.getByRole('heading', {
        name: 'Encountered pokémons',
        level: 2,
      }),
    );
  });

  test('É exibido o próximo Pokémon da lista quando o botão "Próximo pokémon"'
  + ' é clicado', () => {
    renderWithRouter(<App />);

    expect(btnNextPokemon().textContent).toBe('Próximo pokémon');

    const firstPokemon = pokemonName().textContent;
    userEvent.click(btnNextPokemon());
    const secondPokemon = pokemonName().textContent;

    expect(secondPokemon).not.toBe(firstPokemon);
  });

  test('É mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemons = screen.queryAllByTestId('pokemon-name');

    expect(pokemons.length).toBe(1);
  });

  test('A Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const fireFilter = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireFilter);

    const firstPokemonType = pokemonType().textContent;
    expect(firstPokemonType).toBe('Fire');

    const secondPokemonType = pokemonType().textContent;
    expect(secondPokemonType).toBe('Fire');
  });

  test('A Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: /all/i });

    expect(btnAll.textContent).toBe('All');

    userEvent.click(btnAll);

    const firstPokemonType = pokemonType().textContent;
    userEvent.click(screen.getByTestId('next-pokemon'));
    const secondPokemonType = pokemonType().textContent;
    expect(firstPokemonType).not.toBe(secondPokemonType);
  });

  test('É criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonTypes = [
      'Fire',
      'Psychic',
      'Electric',
      'Bug',
      'Poison',
      'Dragon',
      'Normal',
    ];

    const pokemonFilters = screen.getAllByTestId('pokemon-type-button');
    pokemonFilters.forEach((filter) => {
      const found = pokemonTypes.find((type) => type === filter.textContent);
      expect(found).toBeTruthy();
    });
  });

  test('O botão de Próximo pokémon deve ser desabilitado quando a lista'
  + ' filtrada de Pokémons tiver um só pokémon', () => {
    renderWithRouter(<App />);

    const electricFilter = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(electricFilter);

    expect(btnNextPokemon()).toBeDisabled();
  });
});
