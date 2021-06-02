import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter.helper';
import App from '../App';
import dataPokemon from '../data';

let pokemonName;
let pokemonType = 'pokemon-type';
let pokemonWeight = 'pokemon-weight';
let averageWeight = 'Average weight: ';
let pokemonImg;
let historyActual;
let pokemonMoreDetails;

describe('Requisito 7', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    historyActual = history;
    pokemonMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokemonMoreDetails);
    pokemonName = screen.getByTestId('pokemon-name');
    pokemonType = screen.getByTestId('pokemon-type');
    pokemonWeight = screen.getByTestId('pokemon-weight');
    averageWeight = 'Average weight: ';
  });

  test('As informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    screen
      .getByRole('heading', { name: RegExp(`${dataPokemon[0].name} details`, 'i') });

    pokemonImg = screen.getAllByRole('img');
    expect(pokemonName).toHaveTextContent(dataPokemon[0].name);
    expect(pokemonType).toHaveTextContent(dataPokemon[0].type);
    expect(pokemonImg[0]).toHaveAttribute('src', dataPokemon[0].image);
    expect(pokemonImg[0]).toHaveAttribute('alt', `${dataPokemon[0].name} sprite`);
    expect(pokemonWeight)
      .toHaveTextContent(`${
        averageWeight
      }${dataPokemon[0].averageWeight.value
      } ${
        dataPokemon[0].averageWeight.measurementUnit
      }`);

    expect(pokemonMoreDetails).not.toBeInTheDocument();
    screen.getByRole('heading', { level: 2, name: /summary/i });
    screen.getByText(dataPokemon[0].summary);
  });

  test('Existe na página uma seção com os mapas contendo as localizações do pokémon',
    () => {
      screen.getByRole('heading',
        { level: 2, name: `Game Locations of ${dataPokemon[0].name}` });

      dataPokemon[0].foundAt.forEach(({ location, map }, index) => {
        expect(screen.getByText(location)).toBeInTheDocument();
        expect(
          screen.getAllByRole('img', { name: `${dataPokemon[0].name} location` })[index],
        ).toHaveAttribute('src', map);
      });
    });

  test('O usuário pode favoritar um pokémon através da página de detalhes.', () => {
    screen.getByText(/pokémon favoritado/i);
    const inputFavoritePokemon = screen.getByRole('checkbox');
    expect(inputFavoritePokemon).toBeInTheDocument();
    userEvent.click(inputFavoritePokemon);
    historyActual.push('/favorites');
    pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName).toHaveLength(1);
    expect(pokemonName[0]).toBeInTheDocument();
  });
});
