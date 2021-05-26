import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const nameTestId = 'pokemon-name';
const nextPokemonTestId = 'next-pokemon';

describe('renders the home page', () => {
  it(`verify if the home page has a heading "h2"
  with the text "Encountered pokémons"`, () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', { level: 2 });

    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Encountered pokémons');
    expect(heading.tagName).toBe('H2');
  });
});
describe('Test the button "Próximo pokémon"', () => {
  it(`verify if shows the next Pokémon on the list when click on the button
  "Próximo pokémon"`, () => {
    const { getByTestId } = renderWithRouter(<App />);
    // const nextPokemonButton = getAllByRole('button');
    const nextPokemonButton = getByTestId(nextPokemonTestId);

    expect(nextPokemonButton).toBeInTheDocument();
    expect(nextPokemonButton.textContent).toBe('Próximo pokémon');

    const firstPokemon = getByTestId(nameTestId);

    expect(firstPokemon).toBeInTheDocument();
    expect(firstPokemon.textContent).toBe(pokemons[0].name);

    userEvent.click(nextPokemonButton);

    const nextPokemon = getByTestId(nameTestId);

    expect(nextPokemon).toBeInTheDocument();
    expect(nextPokemon.textContent).toBe(pokemons[1].name);
    expect(pokemons[1].name).not.toBe(pokemons[0].name);
  });

  it('verify if shows only one pokemon at time', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const nextPokemonButton = getByTestId(nextPokemonTestId);

    userEvent.click(nextPokemonButton);
    const pokemonList = getAllByTestId(nameTestId);

    expect(pokemonList.length).toBe(1);
    expect(pokemonList[0]).toBeInTheDocument();
  });
});

describe('Test the filter buttons', () => {
  it('verify if has the type filter buttons ', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const filterButtons = getAllByTestId('pokemon-type-button');
    const expectedLenght = 7;

    expect(filterButtons.length).toBe(expectedLenght);
  });

  it(`verify if when a type is selected, the Pokedex only shows
  the pokemons with the selected type`, () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const psychicButton = getByText('Psychic');
    const nextPokemonButton = getByTestId(nextPokemonTestId);
    const currentPokemon = getByTestId(nameTestId);
    const currentPokemonType = getByTestId('pokemon-type');

    userEvent.click(psychicButton);

    expect(currentPokemon.textContent).toBe('Alakazam');
    expect(currentPokemonType.textContent).toBe('Psychic');

    userEvent.click(nextPokemonButton);

    expect(currentPokemon.textContent).toBe('Mew');
    expect(currentPokemonType.textContent).toBe('Psychic');
  });

  it('verify if has the All types button', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const allTypesButton = getByRole('button', { name: 'All' });
    const currentPokemon = getByTestId(nameTestId);
    // const pokemon;

    expect(allTypesButton.textContent).toBe('All');
    expect(allTypesButton).toBeInTheDocument();

    userEvent.click(allTypesButton);

    expect(currentPokemon).toBeInTheDocument();
    expect(currentPokemon.textContent).toBe('Pikachu');
  });
});
