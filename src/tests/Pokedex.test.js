import React from 'react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../helper/renderWithRouter';
import { pokedexData } from '../services/dataTest';

import App from '../App';

describe('Requirement 5 - renders Pokedex', () => {
  const { types, typesRegex, filteredPokemons } = pokedexData;

  it('renders Pokedex heading', () => {
    const { getByRole } = renderWithRouter(<App />);

    const headingPokedex = getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(headingPokedex).toBeInTheDocument();
  });

  it('renders the next button that change the displayed pokemon', () => {
    const { getByRole } = renderWithRouter(<App />);

    const buttonToChange = getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(buttonToChange).toBeInTheDocument();
    expect(buttonToChange).toHaveTextContent(/próximo pokémon/i);
  });

  it('renders the type buttons that change the displayed pokemon', () => {
    const { getAllByTestId, getAllByRole } = renderWithRouter(<App />);

    const buttonsLength = 7;
    const typesButtonId = getAllByTestId('pokemon-type-button');
    expect(typesButtonId.length).toBe(buttonsLength);

    typesRegex.forEach((type) => {
      const typeButton = getAllByRole('button', {
        name: type,
      });

      expect(typeButton.length).toBe(1);
      expect(typeButton[0]).toBeInTheDocument();
      expect(typeButton[0]).toHaveTextContent(type);
    });
  });

  it('renders just one pokemon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const getNameByTestId = getAllByTestId('pokemon-name');
    expect(getNameByTestId.length).toBe(1);
  });

  it('renders the next pokemon when it clicks in next pokemon', () => {
    const { getByRole, getByText, getAllByText } = renderWithRouter(<App />);

    const checkDisplayPokemon = (pokemon) => {
      const { name, type, averageWeight, img, imgSrc } = pokemon;

      const pokemonName = getByText(name);
      expect(pokemonName).toBeInTheDocument();

      const pokemonType = getAllByText(type)[0];
      expect(pokemonType).toBeInTheDocument();

      const pokemonAverage = getByText(averageWeight);
      expect(pokemonAverage).toBeInTheDocument();

      const pokemonImage = getByRole('img', img);
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonImage).toHaveAttribute('src', imgSrc);
    };
    const renderEachPokemon = (_, index, array) => {
      const checkPosition = index === array.length - 1;
      const buttonToChange = getByRole('button', {
        name: /próximo pokémon/i,
      });

      checkDisplayPokemon(array[index]);
      userEvent.click(buttonToChange);

      if (checkPosition) checkDisplayPokemon(array[0]);
      else checkDisplayPokemon(array[index + 1]);
    };

    types.forEach((type) => {
      const typeButton = getByRole('button', { name: type });
      userEvent.click(typeButton);

      filteredPokemons[type].forEach(renderEachPokemon);
    });
  });
});
