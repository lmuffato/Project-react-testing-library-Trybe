import React from 'react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Requisito 6 - Teste o componente <Pokemon.js />',
  () => {
    it('Teste se é renderizado um card com as informações de determinado pokémon',
      () => {
        const pokemon = pokemons[4];
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
    it(`Teste se o card do Pokémon indicado na Pokédex 
    contém um link de navegação para exibir detalhes deste Pokémon.
    O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido`,
    () => {
      const pokemon = pokemons[4];
      const { getByRole } = renderWithRouter(
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ false }
        />,
      );
      const moreDetails = getByRole('link', { name: 'More details' });
      expect(moreDetails).toHaveAttribute('href', '/pokemons/65');
    });
    it(`Teste se ao clicar no link de navegação do Pokémon, 
    é feito o redirecionamento da aplicação para a página de detalhes de Pokémon`,
    () => {

    });
    it(`Teste também se a URL exibida no navegador muda para /pokemon/<id>,
    onde <id> é o id do Pokémon cujos detalhes se deseja ver`,
    () => {
      const pokemon = pokemons[4];
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
    it('Teste se existe um ícone de estrela nos Pokémons favoritados',
      () => {
        const pokemon = pokemons[4];
        const { getByRole } = renderWithRouter(
          <Pokemon
            pokemon={ pokemon }
            isFavorite
          />,
        );
        const star = getByRole('img', { name: `${pokemon.name} is marked as favorite` });
        expect(star).toBeInTheDocument();
        expect(star).toHaveAttribute('src', '/star-icon.svg');
      });
  });
