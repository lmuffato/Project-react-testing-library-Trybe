import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';
import isPokemonFavoriteById from './isPokemonFavorite-data';

describe('Requisito 5 - Teste o componente <Pokedex.js />',
  () => {
    const NEXT_BTN_NAME = 'Próximo pokémon';
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
      const nextButton = getByRole('button', { name: NEXT_BTN_NAME });
      [...Array(pokemons.length * 2)]
        .forEach((_e, index) => {
          const pokemon = getByText(pokemons[index % pokemons.length].name);
          expect(pokemon).toBeInTheDocument();
          userEvent.click(nextButton);
        });
    });
    it('Teste se é mostrado apenas um Pokémon por vez',
      () => {
        const { getByRole, getAllByRole } = renderWithRouter(
          <Pokedex
            pokemons={ pokemons }
            isPokemonFavoriteById={ isPokemonFavoriteById }
          />,
        );
        const nextButton = getByRole('button', { name: NEXT_BTN_NAME });
        [...Array(pokemons.length * 2)]
          .forEach(() => {
            const sprites = getAllByRole('img',
              { name: /sprite/ });
            expect(sprites).toHaveLength(1);
            userEvent.click(nextButton);
          });
      });
    it('Teste se a Pokédex tem os botões de filtro',
      () => {
        const { getAllByTestId } = renderWithRouter(
          <Pokedex
            pokemons={ pokemons }
            isPokemonFavoriteById={ isPokemonFavoriteById }
          />,
        );
        const uniqueTypes = [...new Set(pokemons.map(({ type }) => type))];
        const filterButtons = getAllByTestId('pokemon-type-button');
        const uniqueFilterButtons = [...new Set(filterButtons
          .map(({ innerHTML }) => innerHTML))];
        expect(uniqueFilterButtons).toHaveLength(filterButtons.length);
        expect(uniqueFilterButtons).toHaveLength(uniqueTypes.length);
      });
    it('Testa se a Pokédex tem o botão de filtro All',
      () => {
        const { getByRole } = renderWithRouter(
          <Pokedex
            pokemons={ pokemons }
            isPokemonFavoriteById={ isPokemonFavoriteById }
          />,
        );
        const all = getByRole('button', { name: 'All' });
        expect(all).toBeInTheDocument();
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
      const nextPokemon = getByRole('button', { name: NEXT_BTN_NAME });
      const typesWithOnlyOnePokemon = pokemons
        .map(({ type }) => type)
        .filter((type, _i, arr) => arr.indexOf(type) === arr.lastIndexOf(type));
      typesWithOnlyOnePokemon.forEach((type) => {
        const typeButton = getByRole('button', { name: type });
        userEvent.click(typeButton);
        expect(nextPokemon).toBeDisabled();
      });
    });
  });
