import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

describe('test <Pokedex />', () => {
  it('test text h2', () => {
    // console.log(pokemons[0].id);
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={ pokemons[0] }
      />
    );

    const phraseInPokedex = getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(phraseInPokedex).toBeInTheDocument(); // verifica a existencia do h2
  });

  it('test next pokemon button', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={ pokemons[0] }
      />
    );
    const btnNext = getByText('Próximo pokémon');
    userEvent.click(btnNext); // clicando em "Proximo pokemon"
    const charmander = getByText('Charmander');
    expect(charmander).toBeInTheDocument(); // verificando se o prox é exibido.
  });
});