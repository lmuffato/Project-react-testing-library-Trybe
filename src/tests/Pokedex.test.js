import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Verifica se:', () => {
  const pokemonTypes = new Array(...new Set(pokemons.map((pokemon) => (
    pokemon.type
  ))));

  it('há um heading h2 com o teto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const head2 = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(head2).toBeInTheDocument();
  });

  it('é exibido o próximo pokémon da lista ao se clicar no "botão Próximo pokémon"'
  + ', e se quando estiver no último da lista e clickar o primeiro é exibido'
  + ' e sempre um por vez', () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    const pokeNameInCard = screen.getByTestId('pokemon-name');
    const resetTypeBtn = screen.getByRole('button', { name: 'All' });

    const funcNeededToSatisfyTheAnnoyingLinter = () => (
      pokemons.forEach((pokemon, index, pokeArray) => {
        expect(pokeNameInCard).toHaveTextContent(pokemon.name);
        userEvent.click(nextPokemonBtn);
        if (index + 1 === pokeArray.length) {
          expect(pokeNameInCard).toHaveTextContent(pokeArray[0].name);
        }
      })
    );
    funcNeededToSatisfyTheAnnoyingLinter();
    userEvent.click(resetTypeBtn);
    funcNeededToSatisfyTheAnnoyingLinter();
  });

  it('há botões de filtro com o nome do tipo e se quando clicado exibe apenas os'
  + ' pokémons daquele tipo', () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    const pokeNameInCard = screen.getByTestId('pokemon-name');

    pokemonTypes.forEach((type) => {
      const pokemonsByTypes = pokemons.filter((pokemon) => (pokemon.type === type));
      const allFilterBtns = screen.getAllByTestId('pokemon-type-button');
      const pokemonTypeBtn = allFilterBtns.find((button) => (button.textContent === type));
      userEvent.click(pokemonTypeBtn);
      pokemonsByTypes.forEach((pokemon) => {
        expect(pokeNameInCard).toHaveTextContent(pokemon.name);
        if (pokemonsByTypes.length === 1) {
          expect(nextPokemonBtn).toHaveAttribute('disabled');
        }
        userEvent.click(nextPokemonBtn);
      });
    });
  });
});
