import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';
import mockIsPokemonFavoriteById from '../mocks/mockIsPokemonFavoriteById';

describe('5. Testando componente <Pokedex />', () => {
  test('Página contém um heading h2 com o texto Encountered pokémon', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockIsPokemonFavoriteById }
      />,
    );
    const pokedexHeading = getByRole('heading', { level: 2 });
    expect(pokedexHeading).toBeInTheDocument();
    expect(pokedexHeading).toHaveTextContent('Encountered pokémons');
  });

  test('é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockIsPokemonFavoriteById }
      />,
    );

    const nextButton = getByTestId('next-pokemon');
    expect(nextButton).toHaveTextContent('Próximo pokémon');

    let i = 0;
    while (i < pokemons.length - 1) {
      const currentPokemon = getByText(pokemons[i].name);
      expect(currentPokemon).toBeInTheDocument();
      userEvent.click(nextButton);
      i += 1;
    }
    expect(i).toBe(pokemons.length - 1);
    userEvent.click(nextButton);
    const currentPokemon = getByText(pokemons[0].name);
    expect(currentPokemon).toBeInTheDocument();
  });

  test('é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockIsPokemonFavoriteById }
      />,
    );

    const pokemonNames = getAllByTestId('pokemon-name');
    expect(pokemonNames).toHaveLength(1);
  });

  test('a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockIsPokemonFavoriteById }
      />,
    );

    const fireFilterButton = getAllByTestId('pokemon-type-button')[1];
    expect(fireFilterButton).toHaveTextContent('Fire');
    userEvent.click(fireFilterButton);

    let pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Charmander');

    const nextButton = getByTestId('next-pokemon');
    expect(nextButton).toHaveTextContent('Próximo pokémon');
    userEvent.click(nextButton);

    pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Rapidash');
  });

  test('a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockIsPokemonFavoriteById }
      />,
    );

    const filterAllButton = getByText('All');
    expect(filterAllButton).toBeInTheDocument();
    userEvent.click(filterAllButton);

    const nextButton = getByTestId('next-pokemon');

    let i = 0;
    while (i < pokemons.length - 1) {
      const currentPokemon = getByText(pokemons[i].name);
      expect(currentPokemon).toBeInTheDocument();
      userEvent.click(nextButton);
      i += 1;
    }
    expect(i).toBe(pokemons.length - 1);
    userEvent.click(nextButton);
    const currentPokemon = getByText(pokemons[0].name);
    expect(currentPokemon).toBeInTheDocument();
  });

  test('é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {});

  test('Botão Próximo deve ser desabilitado quando a lista tiver só um pokémon', () => {});
});
