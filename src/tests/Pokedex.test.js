import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Pokedex.js tests', () => {
  it('verify h2 text', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokeDex = getByText('Encountered pokémons');
    expect(pokeDex).toBeInTheDocument();
    expect(pokeDex.tagName).toBe('H2');
  });

  it('verify next pokemon button', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const nextPokemon = getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemon).toBeInTheDocument();
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const charmander = getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    // Testar a lista toda
    for (let index = 1; index < pokemons.length; index += 1) {
      const currentPokemon = getByText(pokemons[index].name);
      expect(currentPokemon).toBeInTheDocument();
      userEvent.click(nextPokemon);
    }
  });

  it('show each pokemon once time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const showOncePokemon = getAllByTestId('pokemon-name');
    expect(showOncePokemon.length).toBe(1);
  });

  it('verify button of Pokemon types', () => {
    const allTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);
    allTypes.forEach((currentType, index) => {
      const pokemonType = getAllByTestId('pokemon-type-button')[index];
      expect(pokemonType).toBeInTheDocument();
      const current = getByRole('button', { name: currentType });
      expect(current).toBeInTheDocument();
    });
  });

  it('reset filter', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnAll = getByText('All');
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    const defaultPokemon = getByText('Pikachu');
    expect(defaultPokemon).toBeInTheDocument();
  });
});
