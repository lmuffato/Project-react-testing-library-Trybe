import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test \'Pokedex\' component', () => {
  it('Test heading \'Encountered pokémons\'', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  it('Test button \'Próximo pokémon\'', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    expect(getByText(/Pikachu/)).toBeInTheDocument();
    const nextPokemonBtn = getByText(/Próximo pokémon/i);
    fireEvent.click(nextPokemonBtn);
    expect(queryByText(/Pikachu/)).toBeNull();
    expect(getByText(/Charmander/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Caterpie/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Ekans/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Alakazam/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Mew/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Rapidash/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Snorlax/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Dragonair/i)).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('Test if there\' only one card at time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonName = getAllByTestId('pokemon-name');
    const pokemonType = getAllByTestId('pokemon-type');
    const pokemonWeight = getAllByTestId('pokemon-weight');
    expect(pokemonName.length).toBe(1);
    expect(pokemonType.length).toBe(1);
    expect(pokemonWeight.length).toBe(1);
  });

  it('Test if Types can be selectad through buttons', () => {
    const { getByText, getByTestId, getByRole,
      getAllByTestId } = renderWithRouter(<App />);
    const typeButtons = getAllByTestId('pokemon-type-button');
    const nextButton = getByTestId('next-pokemon');
    const typeBtnsQty = 7;
    expect(typeButtons.length).toBe(typeBtnsQty);
    fireEvent.click(getByRole('button', { name: /electric/i }));
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    expect(nextButton.disabled).toBe(true);
    fireEvent.click(getByRole('button', { name: /fire/i }));
    expect(getByText(/Charmander/i)).toBeInTheDocument();
    expect(nextButton.disabled).toBe(false);
    fireEvent.click(nextButton);
    expect(getByText(/Rapidash/i)).toBeInTheDocument();
  });
});
