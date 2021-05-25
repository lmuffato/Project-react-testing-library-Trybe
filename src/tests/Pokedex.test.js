import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requirement 5', () => {
  const pokemonName = 'pokemon-name';
  it('Page contains an h2 with the text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const pokedexH2 = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pokedexH2).toBeInTheDocument();
  });

  it('Pokémon is displayed when the "Next Pokémon" is clicked', () => {
    const { getByRole, queryByTestId, queryByText } = renderWithRouter(<App />);
    const initialObjectPokemon = queryByTestId(pokemonName);
    const initialPokemonName = initialObjectPokemon[
      Object.keys(initialObjectPokemon)[1]].children;
    expect(queryByText(initialPokemonName)).toBeInTheDocument();

    const nextPokemonButton = getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const nextPokemonObject = queryByTestId(pokemonName);
    const nextPokemonName = nextPokemonObject[
      Object.keys(nextPokemonObject)[1]].children;

    expect(queryByText(initialPokemonName)).not.toBeInTheDocument();
    expect(queryByText(nextPokemonName)).toBeInTheDocument();

    // https://stackoverflow.com/questions/52783144/how-do-you-test-for-the-non-existence-of-an-element-using-jest-and-react-testing
  });

  it('Pokémon is shown at a time', () => {
    const { getByRole, queryAllByTestId } = renderWithRouter(<App />);

    const nextPokemonButton = getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextPokemonButton);
    userEvent.click(nextPokemonButton);
    const pokemon = queryAllByTestId(pokemonName);

    expect(pokemon.length).toBe(1);
  });

  it('Pokédex has the filter buttons', () => {
    const { queryAllByTestId } = renderWithRouter(<App />);
    const pokemonTypeList = [...new Set(pokemons.map(({ type }) => type))];
    // https://dev.to/clairecodes/how-to-create-an-array-of-unique-values-in-javascript-using-sets-5dg6
    const filterButtonsByType = queryAllByTestId('pokemon-type-button');

    expect(filterButtonsByType.length).toBe(pokemonTypeList.length);

    filterButtonsByType
      .map((button) => button.innerHTML)
      .forEach((type) => expect(pokemonTypeList.includes(type)).toBe(true));
  });

  it('Pokédex contains a button to reset the filter (has the filter "All")', () => {
    const { getByRole } = renderWithRouter(<App />);
    const resetFilterButton = getByRole('button', { name: /All/i });

    expect(resetFilterButton).toBeInTheDocument();
    userEvent.click(resetFilterButton);
  });

  it('Filter button is created dynamically for each type of Pokémon', () => {
    const { queryAllByTestId } = renderWithRouter(<App />);
    const pokemonTypeList = [...new Set(pokemons.map(({ type }) => type))];
    const filterByTypeButtons = queryAllByTestId('pokemon-type-button');

    pokemonTypeList.forEach((type, index) => {
      expect(filterByTypeButtons[index]).toHaveTextContent(type);
    });
  });

  it('Disables "Next Pokémon" when there is only one Pokémon in the filter', () => {
    const { getByRole } = renderWithRouter(<App />);
    const buttonFilterEletric = getByRole('button', { name: /Electric/i });
    const nextPokemonButton = getByRole('button', { name: /Próximo pokémon/i });

    userEvent.click(buttonFilterEletric);
    expect(nextPokemonButton.disabled).toBeTruthy();
  });
});
