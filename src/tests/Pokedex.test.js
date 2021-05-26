import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { fireEvent } from '@testing-library/dom';

describe('Test \'Pokedex\' component', () => {
  it('Test heading \'Encountered pokémons\'', () => {
    const { getByText, getByRole } = renderWithRouter(<App/>);
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  it('Test button \'Próximo pokémon\'', () => {
    const { getByText, queryByText } = renderWithRouter(<App/>);
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


});
