import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

describe('test <Pokedex />', () => {
  const qtyButtons = 7;
  it('test text h2', () => {
    // console.log(pokemons[0].id);
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons[0] }
      />,
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
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons[0] }
      />,
    );
    const btnNext = getByText('Próximo pokémon');
    userEvent.click(btnNext); // clicando em "Proximo pokemon"
    const charmander = getByText('Charmander');
    expect(charmander).toBeInTheDocument(); // verificando se o prox é exibido.
  });

  it('test if only pokemon is shown at a time', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons[0] }
      />,
    );

    const qtyPokemonName = getAllByTestId('pokemon-name').length;
    expect(qtyPokemonName).toBe(1); // verifica se há somente 1 pokemon renderizado
  });

  it('test whether the filter buttons exist', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons[0] }
      />,
    );

    const filtersButton = getAllByTestId('pokemon-type-button');
    expect(filtersButton.length).toBe(qtyButtons);
  });

  it('test if the Pokedéx contains the all button', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons[0] }
      />,
    );
    const btnAll = getByText('All');
    userEvent.click(btnAll);
    const verifyPokemon = getByText('Pikachu');
    expect(verifyPokemon).toBeInTheDocument();
  });

  it('test if the next button is disable when necessary', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokemons[0] }
      />,
    );

    const btnElectric = getByRole('button', {
      name: 'Electric',
    });
    userEvent.click(btnElectric);
    const btnNext = getByText('Próximo pokémon');
    expect(btnNext).toBeDisabled();
  });
});
