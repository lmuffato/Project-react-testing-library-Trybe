import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';

describe('', () => {
  it('renders a heading with the text `Encountered pokémons`', () => {
    renderWithRouter(<App />);
    const heading = screen
      .getByRole('heading', { level: 2, name: /Encountered Pokémons/i });
    expect(heading).toBeInTheDocument();
  });
  it('rendering next pokemon, when clicking on the button', () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonButton);
    let pokemon = screen.getByText(/Charmander/i);
    expect(pokemon).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    pokemon = screen.getByText(/Caterpie/i);
    expect(pokemon).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    pokemon = screen.getByText(/Ekans/i);
    expect(pokemon).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    pokemon = screen.getByText(/Alakazam/i);
    expect(pokemon).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    pokemon = screen.getByText(/Mew/i);
    expect(pokemon).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    pokemon = screen.getByText(/Rapidash/i);
    expect(pokemon).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    pokemon = screen.getByText(/Snorlax/i);
    expect(pokemon).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    pokemon = screen.getByText(/Dragonair/i);
    expect(pokemon).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });

  it('test button Electric', () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const electricButton = screen.getByRole('button', { name: /electric/i });
    userEvent.click(electricButton);
    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
  });
});
