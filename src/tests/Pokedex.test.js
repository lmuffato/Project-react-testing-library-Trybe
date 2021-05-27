import React from 'react';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokedex test', () => {
  it('Mostra um h2 com `Encountered pokémons`', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const h2 = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    })
    expect(h2).toBeInTheDocument();
  });

  it('Mostra o proximo pokemon quando clica em `Proximo pokémon`'
  + ' vai para o primeiro pkmn depois que o ultimo foi clicado', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
        expect(getByText(pokemon.name)).toBeInTheDocument();
        userEvent.click(screen.getByTestId('next-pokemon'));
    });
    expect(getByTestId('next-pokemon')).toBeInTheDocument();
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('mostra apenas um pokemon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  })

  it('mostra os botões com todos os tipos de pkmn', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const typeButtons = getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toBe(7);
  });

});