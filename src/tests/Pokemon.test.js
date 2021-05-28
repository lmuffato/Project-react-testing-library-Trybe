import React from 'react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe.each(pokemons)('Requisito 6 - Teste o componente <Pokemon.js />',
  (pokemon) => {
    it(`Teste se é renderizado um card com as informações do pokémon ${pokemon.name}`,
      () => {
        const { getByTestId, getByRole } = renderWithRouter(
          <Pokemon
            pokemon={ pokemon }
            isFavorite={ false }
          />,
        );
        const name = getByTestId('pokemon-name');
        expect(name).toHaveTextContent(pokemon.name);
        const type = getByTestId('pokemon-type');
        expect(type).toHaveTextContent(pokemon.type);
        const weight = getByTestId('pokemon-weight');
        const { value, measurementUnit } = pokemon.averageWeight;
        expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
        const sprite = getByRole('img', { name: `${pokemon.name} sprite` });
        expect(sprite).toHaveAttribute('src', pokemon.image);
      });

    it(`Teste se o card do Pokémon ${pokemon.name}
        contém um link de navegação para exibir detalhes deste Pokémon.
        O link deve possuir a URL /pokemons/${pokemon.id}`,
    () => {
      const { getByRole } = renderWithRouter(
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ false }
        />,
      );
      const moreDetails = getByRole('link', { name: 'More details' });
      expect(moreDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
    });

    it(`Teste também se a URL exibida no navegador muda para /pokemon/${pokemon.id}>`,
      () => {
        const { getByRole, history } = renderWithRouter(
          <Pokemon
            pokemon={ pokemon }
            isFavorite={ false }
          />,
        );
        const moreDetails = getByRole('link', { name: 'More details' });
        userEvent.click(moreDetails);
        expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
      });

    it(`Teste se existe um ícone de estrela no Pokémon
    ${pokemon.name} caso ele esteja favoritado`,
    () => {
      const { getByRole } = renderWithRouter(
        <Pokemon
          pokemon={ pokemon }
          isFavorite
        />,
      );
      const star = getByRole('img',
        { name: `${pokemon.name} is marked as favorite` });
      expect(star).toBeInTheDocument();
      expect(star).toHaveAttribute('src', '/star-icon.svg');
    });
  });
