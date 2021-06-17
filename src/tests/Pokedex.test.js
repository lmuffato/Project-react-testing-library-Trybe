import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('tests for the NotFound component', () => {
  it('Test if page contains a heading with the text Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText('Encountered pokémons');

    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('test the next pokemon button', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const nextPokemon = getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemon).toBeInTheDocument();

    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    userEvent.click(nextPokemon);

    const charmander = getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    for (let index = 1; index < pokemons.length; index += 1) {
      const currentPokemon = getByText(pokemons[index].name);
      expect(currentPokemon).toBeInTheDocument();
      userEvent.click(nextPokemon);
    }
  });

  it('Test if only one Pokémon is shown at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonShown = getAllByTestId('pokemon-name');
    expect(pokemonShown.length).toBe(1);
  });

  it('Test if the Pokédex contains a button to reset the filter', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonReset = getByText('All');
    expect(buttonReset).toBeInTheDocument();

    userEvent.click(buttonReset);

    const defaultPokemon = getByText('Pikachu');
    expect(defaultPokemon).toBeInTheDocument();
  });

  it('Test whether a filter button is created for each type of Pokémon', () => {
    const allTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);
    allTypes.forEach((currentType, index) => {
      const pokemonType = getAllByTestId('pokemon-type-button')[index];
      expect(pokemonType).toBeInTheDocument();
      const current = getByRole('button', { name: currentType });
      expect(current).toBeInTheDocument();
    });
  });
});
