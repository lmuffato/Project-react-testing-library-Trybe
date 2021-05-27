import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Requisito 5', () => {
  test('Testando se a página contém um heading(h2)', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons[0] }
      />,
    );

    const heading = getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });

  test('Teste se os pokemons são mostrados ao clicar no botão `Próximo pokémon`', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons }
      />,
    );

    const btnNextPokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(btnNextPokemon).toBeInTheDocument();

    for (let index = 0; index < pokemons.length; index += 1) {
      const text = getByText(pokemons[index % pokemons.length].name);
      expect(text).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
    }
  });

  test('Testando se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons }
      />,
    );

    const linkText = getAllByRole('link', {
      name: /More details/i,
    });
    expect(linkText).toHaveLength(1);
  });

  test('Testando a existência dos botões de filtro', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons }
      />,
    );

    const btnNextPokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(btnNextPokemon).toBeInTheDocument();

    const btnEletric = getByRole('button', {
      name: /Electric/i,
    });
    expect(btnEletric).toBeInTheDocument();

    userEvent.click(btnEletric);
    const electric = pokemons.filter(({ type }) => type === 'Electric');

    for (let index = 0; index <= electric.length; index += 1) {
      const text = getByText(electric[index % electric.length].name);
      expect(text).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
    }
  });

  test('Testando se a Pokédex contém um botão de reset', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons }
      />,
    );

    const btnNextPokemon = getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(btnNextPokemon).toBeInTheDocument();

    const btnAll = getByRole('button', {
      name: /All/i,
    });
    expect(btnAll).toBeInTheDocument();

    userEvent.click(btnAll);

    for (let index = 0; index <= pokemons.length; index += 1) {
      const text = getByText(pokemons[index % pokemons.length].name);
      expect(text).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
    }
  });

  test('Testando os botões dinâmicos', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons }
      />,
    );

    const btnDinamico = getAllByTestId('pokemon-type-button');
    expect(btnDinamico[0]).toBeInTheDocument();
  });

  test('Verificando se o botão `Próximo pokémon` está desabilitado', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons }
      />,
    );

    const btnNextPokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(btnNextPokemon).toBeInTheDocument();

    const btnEletric = getByRole('button', {
      name: /Electric/i,
    });
    expect(btnEletric).toBeInTheDocument();

    userEvent.click(btnEletric);
    const electric = pokemons.filter(({ type }) => type === 'Electric');

    for (let index = 0; index <= electric.length; index += 1) {
      const text = getByText(electric[index % electric.length].name);
      expect(text).toBeInTheDocument();
      expect(btnNextPokemon).toBeDisabled();
    }
  });
});
