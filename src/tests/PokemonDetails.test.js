import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import pokemons from '../data';
import { PokemonDetails } from '../components';

describe('Requisito 7 - Teste o componente <PokemonDetails.js />',
  () => {
    it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela',
      () => {
        const pokemon = pokemons[4];
        const { getByRole, getByTestId } = render(
          <PokemonDetails
            isPokemonFavoriteById={ { [pokemon.id]: false } }
            match={ { params: { id: pokemon.id } } }
            onUpdateFavoritePokemons={ jest.fn(() => {}) }
            pokemons={ pokemons }
          />,
        );
        const detailsHeader = getByRole('heading', { name: `${pokemon.name} Details` });
        expect(detailsHeader).toBeInTheDocument();
        const name = getByTestId('pokemon-name');
        expect(name).toHaveTextContent(pokemon.name);
        const type = getByTestId('pokemon-type');
        expect(type).toHaveTextContent(pokemon.type);
        const weight = getByTestId('pokemon-weight');
        expect(weight).toHaveTextContent(pokemon.averageWeight.value);
        const sprite = getByRole('img', { name: `${pokemon.name} sprite` });
        expect(sprite).toHaveAttribute('src', pokemon.image);
      });
    it('Teste se o sumário é renderizado corretamente',
      () => {
        const pokemon = pokemons[4];
        const { getByText, getByRole } = render(
          <PokemonDetails
            isPokemonFavoriteById={ { [pokemon.id]: false } }
            match={ { params: { id: pokemon.id } } }
            onUpdateFavoritePokemons={ jest.fn(() => {}) }
            pokemons={ pokemons }
          />,
        );
        const summaryHeader = getByRole('heading', { name: 'Summary' });
        expect(summaryHeader).toBeInTheDocument();
        const summaryContent = getByText(pokemon.summary);
        expect(summaryContent).toBeInTheDocument();
      });
    it(`Teste se existe na página uma seção com os mapas 
    contendo as localizações do pokémon`,
    () => {
      const pokemon = pokemons[4];
      const { getByRole, getAllByRole, getByText } = render(
        <PokemonDetails
          isPokemonFavoriteById={ { [pokemon.id]: false } }
          match={ { params: { id: pokemon.id } } }
          onUpdateFavoritePokemons={ jest.fn(() => {}) }
          pokemons={ pokemons }
        />,
      );
      const locationHeader = getByRole('heading',
        { name: `Game Locations of ${pokemon.name}` });
      expect(locationHeader).toBeInTheDocument();
      const locations = getAllByRole('img', { name: `${pokemon.name} location` });
      expect(locations).toHaveLength(pokemon.foundAt.length);
      locations.forEach((location, index) => {
        expect(location).toHaveAttribute('src', pokemon.foundAt[index].map);
        const locationName = getByText(pokemon.foundAt[index].location);
        expect(locationName).toBeInTheDocument();
      });
    });
    it('Teste se o usuário pode favoritar um pokémon através da página de detalhes',
      () => {
        const mockCallback = jest.fn();
        const pokemon = pokemons[4];
        const { getByRole } = render(
          <PokemonDetails
            isPokemonFavoriteById={ { [pokemon.id]: false } }
            match={ { params: { id: pokemon.id } } }
            onUpdateFavoritePokemons={ mockCallback }
            pokemons={ pokemons }
          />,
        );
        const checkbox = getByRole('checkbox', { name: 'Pokémon favoritado?' });
        expect(checkbox).toBeInTheDocument();
        userEvent.click(checkbox);
        userEvent.click(checkbox);
        userEvent.click(checkbox);
        const NUMBER_OF_CLICKS = 3;
        expect(mockCallback).toHaveBeenCalledTimes(NUMBER_OF_CLICKS);
      });
  });
