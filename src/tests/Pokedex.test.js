import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokedex component', () => {
  test('Contains heading h2 pokedex', () => {
    const {
      getByRole,
      history,
    } = renderWithRouter(<App />);
    history.push('/');

    const heading2 = getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading2).toBeInTheDocument();
  });

  test('click next pokemon button', () => {
    const {
      getByText,
      getByTestId,
      history,
    } = renderWithRouter(<App />);
    history.push('/');

    const averageWeight = getByText(/Average weight:/i);
    expect(averageWeight).toBeInTheDocument();

    const averageWeightSplit = averageWeight.innerHTML.split(':');
    const averageBefore = averageWeightSplit[1];

    const nextPokemon = getByTestId('next-pokemon');
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);

    const averageWeightNext = getByText(/Average weight:/i);
    expect(averageWeightNext).toBeInTheDocument();

    const averageWeightSplitNext = averageWeight.innerHTML.split(':');
    const averageNext = averageWeightSplitNext[1];

    expect(averageBefore).not.toBe(averageNext);
  });

  test('click type button', () => {
    const {
      getByText,
      getByTestId,
      getAllByTestId,
      history,
    } = renderWithRouter(<App />);
    history.push('/');

    const typePokemonButton = getAllByTestId('pokemon-type-button');
    const numbertypePokemonButton = 7;
    expect(typePokemonButton.length).toEqual(numbertypePokemonButton);

    userEvent.click(typePokemonButton[1]);

    const pokemonPrevious = getByText(/Average weight:/i).previousSibling.previousSibling;
    expect(pokemonPrevious.innerHTML).toBe('Charmander');

    const pokemonType = getByText(/Average weight:/i).previousSibling;
    expect(pokemonType.innerHTML).toBe('Fire');

    const nextButton = getByTestId('next-pokemon');
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);

    const pokemonNext = getByText(/Average weight:/i).previousSibling.previousSibling;
    expect(pokemonNext.innerHTML).toBe('Rapidash');
  });

  test('Check All button', () => {
    const {
      getByText,
      getByTestId,
      history,
    } = renderWithRouter(<App />);
    history.push('/');

    const buttonAll = getByText(/All/i);
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);

    const nextButton = getByTestId('next-pokemon');
    expect(nextButton).toBeInTheDocument();

    const pokemonTypePrevious = getByText(/Average weight:/i).previousSibling;
    expect(pokemonTypePrevious.innerHTML).toBe('Electric');

    userEvent.click(nextButton);

    const pokemonTypeNext = getByText(/Average weight:/i).previousSibling;
    expect(pokemonTypeNext.innerHTML).toBe('Fire');
  });

  test('Test button types', () => {
    const {
      getAllByTestId,
      history,
    } = renderWithRouter(<App />);
    history.push('/');

    const typePokemonButton = getAllByTestId('pokemon-type-button');

    const typeELectric = typePokemonButton[0];
    expect(typeELectric.innerHTML).toBe('Electric');

    const typeFire = typePokemonButton[1];
    expect(typeFire.innerHTML).toBe('Fire');

    const typeBug = typePokemonButton[2];
    expect(typeBug.innerHTML).toBe('Bug');

    const typePoison = typePokemonButton[3];
    expect(typePoison.innerHTML).toBe('Poison');

    const typePsychic = typePokemonButton[4];
    expect(typePsychic.innerHTML).toBe('Psychic');

    const typeNormal = typePokemonButton[5];
    expect(typeNormal.innerHTML).toBe('Normal');

    const typeDragon = typePokemonButton[6];
    expect(typeDragon.innerHTML).toBe('Dragon');
  });
});
