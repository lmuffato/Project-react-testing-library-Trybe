import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Testando componente pokedex', () => {
  test('Testando se a página contém um heading h2', () => {
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

  test('Testa se os pokemons aparecem ao clicar no botão `Próximo pokémon`', () => {
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

  test('Testando se é apresentado apenas um pokemon ao clicar proximo', () => {
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

  test('Testando os botoes de filtro', () => {
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

  test('Testando o botao de reset', () => {
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

    for (let cont = 0; cont <= pokemons.length; cont += 1) {
      const text = getByText(pokemons[cont % pokemons.length].name);
      expect(text).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
    }
  });

  test('Testando botões dinâmicos', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons }
      />,
    );

    const btnDinamico = getAllByTestId('pokemon-type-button');
    expect(btnDinamico[0]).toBeInTheDocument();
  });

  test('Verificando se o botão `Próximo pokémon` está desativado', () => {
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
