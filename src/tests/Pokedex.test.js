import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';
import isPokemonFavoriteById from './isPokemonFavorite-data';

describe('Requisito 5 - Teste o componente <Pokedex.js />',
  () => {
    const NEXT_POKEMON = 'Próximo pokémon';
    it('Teste se página contém um heading h2 com o texto Encountered pokémons',
      () => {
        const { getByRole } = renderWithRouter(
          <Pokedex
            pokemons={ pokemons }
            isPokemonFavoriteById={ isPokemonFavoriteById }
          />,
        );
        const header = getByRole('heading',
          { name: 'Encountered pokémons',
            level: 2 });
        expect(header).toBeInTheDocument();
      });
    it(`Teste se é exibido o próximo Pokémon da lista
    quando o botão Próximo pokémon é clicado`,
    () => {
      const { getByRole, getByText } = renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />,
      );
      const nextPokemon = getByRole('button', { name: NEXT_POKEMON });
      userEvent.click(nextPokemon);
      // Since this test is mocked I know for sure the next one is Charmander
      const charmander = getByText('Charmander');
      expect(charmander).toBeInTheDocument();
    });
    it('Teste se é mostrado apenas um Pokémon por vez',
      () => {
        const { getAllByRole } = renderWithRouter(
          <Pokedex
            pokemons={ pokemons }
            isPokemonFavoriteById={ isPokemonFavoriteById }
          />,
        );
        const sprites = getAllByRole('img',
          { name: /sprite/ });
        expect(sprites).toHaveLength(1);
      });
    it('Teste se a Pokédex tem os botões de filtro',
      () => {
        const { getAllByTestId } = renderWithRouter(
          <Pokedex
            pokemons={ pokemons }
            isPokemonFavoriteById={ isPokemonFavoriteById }
          />,
        );
        const types = [...new Set(pokemons.map(({ type }) => type))];
        const filterButtons = getAllByTestId('pokemon-type-button');
        const filterButtonsNoRepeatedTypes = [...new Set(filterButtons
          .map(({ innerHTML }) => innerHTML))];
        expect(filterButtonsNoRepeatedTypes).toHaveLength(filterButtons.length);
        expect(filterButtonsNoRepeatedTypes).toHaveLength(types.length);
      });
    it('Testa se o botão Próximo Pokémon está funcionando',
      () => {
        const { getByRole, getByText } = renderWithRouter(
          <Pokedex
            pokemons={ pokemons }
            isPokemonFavoriteById={ isPokemonFavoriteById }
          />,
        );
        const all = getByRole('button', { name: 'All' });
        userEvent.click(all);
        const nextPokemon = getByRole('button', { name: NEXT_POKEMON });
        Array(pokemons.length * 2).forEach((_e, index) => {
          const pokemon = getByText(pokemons[index % pokemons.length].name);
          expect(pokemon).toBeInTheDocument();
          userEvent.click(nextPokemon);
        });
      });
    it(`O botão de Próximo pokémon deve ser desabilitado quando a lista
     filtrada de Pokémons tiver um só pokémon`,
    () => {
      const { getByRole } = renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ isPokemonFavoriteById }
        />,
      );
      const electricButton = getByRole('button', { name: 'Electric' });
      userEvent.click(electricButton);
      const nextPokemon = getByRole('button', { name: NEXT_POKEMON });
      expect(nextPokemon).toBeDisabled();
    });
  });
