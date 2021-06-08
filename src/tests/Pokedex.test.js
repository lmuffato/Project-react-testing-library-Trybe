import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import { Pokedex } from '../components';
import pokemons from '../data';
import renderWithRouter from '../components/renderWithRouter ';

const isPokemonFavoriteById = pokemons.map((pokemon) => pokemon.id);
const testIdNum = 7;

describe('Pokedex', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);

    const heading = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });
});

describe('é próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
  it('', () => {
    const { getByRole } = renderWithRouter(
      <App />,
    );
    const proximoPokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(proximoPokemon).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getByRole, getByText } = renderWithRouter(
      <App />,
    );

    const proximoPokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });

    fireEvent.click(proximoPokemon);
    const secondPok = getByText('Charmander');
    expect(secondPok).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', {
      name: /all/i,
    });

    fireEvent.click(buttonAll);
    const firstPokemon = getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });

  describe('Teste botoes', () => {
    it('', () => {
      const { getByRole, getByText } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const nextPokemon = getByRole('button', {
        name: /próximo pokémon/i,
      });
      const allPokemons = getByRole('button', {
        name: /all/i,
      });
      const electricPokemon = getByRole('button', {
        name: /electric/i,
      });
      const firePokemon = getByRole('button', {
        name: /fire/i,
      });
      const bugPokemon = getByRole('button', {
        name: /bug/i,
      });
      const psychicPokemon = getByRole('button', {
        name: /psychic/i,
      });
      const normalPokemon = getByRole('button', {
        name: /normal/i,
      });
      const dragonPokemon = getByRole('button', {
        name: /dragon/i,
      });
      expect(nextPokemon).toBeInTheDocument();
      expect(allPokemons).toBeInTheDocument();
      expect(electricPokemon).toBeInTheDocument();
      expect(firePokemon).toBeInTheDocument();
      expect(bugPokemon).toBeInTheDocument();
      expect(psychicPokemon).toBeInTheDocument();
      expect(normalPokemon).toBeInTheDocument();
      expect(dragonPokemon).toBeInTheDocument();

      fireEvent.click(allPokemons);

      const getPikachu = getByText('Pikachu');
      expect(getPikachu).toBeInTheDocument();
    });

    it('Testing data-testid', () => {
      const { getAllByTestId } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const testIdBtn = getAllByTestId('pokemon-type-button');
      expect(testIdBtn.length).toBe(testIdNum);
    });
  });
});
