import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import { Pokedex } from '../components';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const isPokemonFavoriteById = pokemons.map((pokemon) => pokemon.id);
const testIdNum = 7;

// Requisitos realiazado com ajuda de Pollyana Oliveira Turma 10A, Adão Benites Turma 10B.
// Requisito 05 realizado com a ajuda de Rafael Cardoso Turma 10A
describe('Testing component Pokedex', () => {
  it('Should have a h2 with "Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);

    const h2 = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(h2).toBeInTheDocument();
  });
});

describe('Testing btn Next Pokemon', () => {
  it('should have a btn "Próximo Pokemon', () => {
    const { getByRole } = renderWithRouter(
      <App />,
    );
    const nextPokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(nextPokemon).toBeInTheDocument();
  });
  it('should click once and show up Charmander', () => {
    const { getByRole, getByText } = renderWithRouter(
      <App />,
    );

    const nextPokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });

    fireEvent.click(nextPokemon);
    const secondPok = getByText('Charmander');
    expect(secondPok).toBeInTheDocument();
  });

  it('should click 9 times and have pikachu again', () => {
    const { getByRole, getByText } = renderWithRouter(
      <App />,
    );

    const nextPokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });

    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    fireEvent.click(nextPokemon);
    const pikachuAgain = getByText('Pikachu');
    expect(pikachuAgain).toBeInTheDocument();
  });
});

describe('Testing all buttons', () => {
  it('should get every single button', () => {
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
