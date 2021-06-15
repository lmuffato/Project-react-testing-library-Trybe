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
    userEvent.click(nextPokemon);
    const caterpie = getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();
  });
});
