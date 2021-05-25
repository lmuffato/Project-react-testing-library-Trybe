import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa todo o Componente "Pokedex"', () => {
  test('Verifica se página contém um heading h2 com o'
  + ' texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByText(/Encountered pokémons/);

    expect(h2).toBeInTheDocument();
  });

  test('Verifica se é exibido o próximo Pokémon da lista quando o'
  + 'botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);
    const button = screen.getByText(/Próximo pokémon/);
    expect(button).toBeInTheDocument();

    const nextpokemon = () => screen.getByTestId('pokemon-name').innerHTML;

    const PokemonsNames = ['Pikachu', 'Charmander', 'Caterpie',
      'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames[1]);

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames[2]);

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames[3]);

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames[4]);

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames[5]);

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames[6]);

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames[7]);

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames[8]);

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames[0]);
  });
});
