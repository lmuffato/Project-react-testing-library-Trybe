import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter.helper';
import App from '../App';
import dataPokemon from '../data';

let pokemonName = 'pokemon-name';
let pokemonType = 'pokemon-type';
let pokemonWeight = 'pokemon-weight';
let averageWeight = 'Average weight: ';
let pokemonImg;
let historyActual;
let pokemonMoreDetails;

describe('Requisito 6', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    historyActual = history;
    pokemonName = screen.getByTestId('pokemon-name');
    pokemonType = screen.getByTestId('pokemon-type');
    pokemonWeight = screen.getByTestId('pokemon-weight');
    averageWeight = 'Average weight: ';
    pokemonImg = screen.getByRole('img');
    pokemonMoreDetails = screen.getByRole('link', { name: /more details/i });
  });

  test('É renderizado um card com as informações de determinado pokémon.', () => {
    expect(pokemonName).toHaveTextContent(dataPokemon[0].name);
    expect(pokemonType).toHaveTextContent(dataPokemon[0].type);
    expect(pokemonImg).toHaveAttribute('src', dataPokemon[0].image);
    expect(pokemonImg).toHaveAttribute('alt', `${dataPokemon[0].name} sprite`);
    expect(pokemonWeight)
      .toHaveTextContent(`${
        averageWeight
      }${dataPokemon[0].averageWeight.value
      } ${
        dataPokemon[0].averageWeight.measurementUnit
      }`);
  });

  test('O card do Pokémon indicado na Pokédex contém um link de navegação para exibir'
    + 'detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>,'
    + 'onde <id> é o id do Pokémon exibido', () => {
    userEvent.click(pokemonMoreDetails);
    expect(historyActual.location.pathname).toBe(`/pokemons/${dataPokemon[0].id}`);
  });

  test('Deve existir um ícone de estrela nos Pokémons favoritados.', () => {
    userEvent.click(pokemonMoreDetails);
    const inputFavoritePokemon = screen.getByRole('checkbox');
    userEvent.click(inputFavoritePokemon);
    const imgFavorite = screen
      .getByRole('img', { name: `${dataPokemon[0].name} is marked as favorite` });
    expect(imgFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
