import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Requisito 3 - Teste o componente <FavoritePokemons.js />',
  () => {
    it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
    se a pessoa não tiver pokémons favoritos`,
    () => {
      const { getByText } = render(<FavoritePokemons />);
      const message = getByText('No favorite pokemon found');
      expect(message).toBeInTheDocument();
    });
    it('Teste se é exibido todos os cards de pokémons favoritados',
      () => {
        const pokemonsToTest = [pokemons[0], pokemons[1]];
        const { getByRole } = renderWithRouter(
          <FavoritePokemons pokemons={ pokemonsToTest } />,
        );
        pokemonsToTest.forEach((pokemon) => {
          const image = getByRole(
            'img', { name: `${pokemon.name} is marked as favorite` },
          );
          expect(image).toBeInTheDocument();
        });
      });
    it('Teste se nenhum card é exibido caso o pokémon não esteja favoritado',
      () => {
        const pokemonsToTest = [pokemons[0], pokemons[1]];
        const { queryByRole } = renderWithRouter(
          <FavoritePokemons pokemons={ pokemonsToTest } />,
        );
        const pokemonsNotInFavorites = pokemons
          .filter((pokemon) => !pokemonsToTest.includes(pokemon));
        pokemonsNotInFavorites.forEach((pokemon) => {
          const image = queryByRole(
            'img', { name: `${pokemon.name} is marked as favorite` },
          );
          expect(image).not.toBeInTheDocument();
        });
      });
  });
