import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokeType = 'pokemon-type';
// const btnPokeType = 'pokemon-type-button';
const pokeName = 'pokemon-name';
// const nextPokemon = 'next-pokemon';

describe('Testa os componentes do cardPokemon', () => {
  test('Testa se o nome correto do pokemon aparece na tela', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId(pokeName);
    expect(pokemonName.innerHTML).toBe('Pikachu');
  });
  test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId(pokeType);
    expect(pokemonType.innerHTML).toBe('Electric');
  });
});
