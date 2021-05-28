import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import pokemons from '../data';
import { PokemonDetails } from '../components';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe.each(pokemons)('Requisito 7 - Teste o componente <PokemonDetails.js />',
  (pokemon) => {
    it(`Teste se as informações detalhadas do pokémon
    ${pokemon.name} são mostradas na tela`,
    () => {
      const { getByRole, getByTestId } = render(
        <PokemonDetails
          isPokemonFavoriteById={ { [pokemon.id]: false } }
          match={ { params: { id: pokemon.id } } }
          onUpdateFavoritePokemons={ jest.fn(() => {}) }
          pokemons={ pokemons }
        />,
      );
      const detailsHeader = getByRole('heading',
        { name: `${pokemon.name} Details`,
          level: 2 });
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
    it(`Teste se o sumário do pokémon ${pokemon.name} é renderizado corretamente`,
      () => {
        const { getByText, getByRole } = render(
          <PokemonDetails
            isPokemonFavoriteById={ { [pokemon.id]: false } }
            match={ { params: { id: pokemon.id } } }
            onUpdateFavoritePokemons={ jest.fn(() => {}) }
            pokemons={ pokemons }
          />,
        );
        const summaryHeader = getByRole('heading',
          { name: 'Summary',
            level: 2 });
        expect(summaryHeader).toBeInTheDocument();
        const summaryContent = getByText(pokemon.summary);
        expect(summaryContent).toBeInTheDocument();
      });
    it(`Teste se existe na página uma seção com os mapas 
    ${pokemon.name} contendo as localizações do pokémon `,
    () => {
      const { getByRole, getAllByRole, getByText } = render(
        <PokemonDetails
          isPokemonFavoriteById={ { [pokemon.id]: false } }
          match={ { params: { id: pokemon.id } } }
          onUpdateFavoritePokemons={ jest.fn(() => {}) }
          pokemons={ pokemons }
        />,
      );
      const locationHeader = getByRole('heading',
        { name: `Game Locations of ${pokemon.name}`,
          level: 2 });
      expect(locationHeader).toBeInTheDocument();
      const locations = getAllByRole('img', { name: `${pokemon.name} location` });
      expect(locations).toHaveLength(pokemon.foundAt.length);
      locations.forEach((location, index) => {
        expect(location).toHaveAttribute('src', pokemon.foundAt[index].map);
        const locationName = getByText(pokemon.foundAt[index].location);
        expect(locationName).toBeInTheDocument();
      });
    });
    it(`Teste se o usuário pode favoritar o pokémon
    ${pokemon.name} através da página de detalhes`,
    () => {
      const { history, getByRole } = renderWithRouter(<App />);
      history.push(`/pokemons/${pokemon.id}`);
      const checkbox = getByRole('checkbox', { name: 'Pokémon favoritado?' });
      expect(checkbox).toBeInTheDocument();
      userEvent.click(checkbox);
      const star = getByRole('img', { name: `${pokemon.name} is marked as favorite` });
      expect(star).toBeInTheDocument();
    });
  });
