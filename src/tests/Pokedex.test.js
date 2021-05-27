import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Pokedex from '../components/Pokedex';

const testModel = (type) => [{
  id: 25,
  name: 'Pikachu',
  type,
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
},
{
  id: 4,
  name: 'Charmander',
  type,
  averageWeight: {
    value: '8.5',
    measurementUnit: 'kg',
  },
}];

const testModelOriginal = () => [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
},
{
  id: 4,
  name: 'Charmander',
  type: 'Fire',
  averageWeight: {
    value: '8.5',
    measurementUnit: 'kg',
  },
}];

const renderPokedex = (model) => {
  renderWithRouter(<Pokedex
    pokemons={ model }
    isPokemonFavoriteById={ { 4: true, 25: false } }
  />);
};

const pokemonTypeText = 'pokemon-type';

const testButton = (buttonName) => {
  const type = new RegExp(buttonName, 'i');
  let pokemonType = screen.getByTestId(pokemonTypeText);
  expect(pokemonType.textContent).toMatch(type);
  const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
  userEvent.click(nextPokemon);
  const pokemon = screen.getByText(/Charmander/i);
  expect(pokemon).toBeInTheDocument();
  pokemonType = screen.getByTestId(pokemonTypeText);
  expect(pokemonType.textContent).toMatch(type);
};
describe('header and nextPokemon button', () => {
  it('render heading with text Encountered Pokemons', () => {
    renderPokedex(testModelOriginal());
    const heading = screen
      .getByRole('heading', { level: 2, name: /Encountered Pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('rendering next pokemon, when clicking on the button', () => {
    renderPokedex(testModelOriginal());
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonButton);
    let pokemon = screen.getByText(/Charmander/i);
    expect(pokemon).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });

  it('Disables next pokemon button when there is only one pokemon.', () => {
    renderPokedex(testModelOriginal());
    const button = screen.getByRole('button', { name: /electric/i });
    userEvent.click(button);
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemon).toBeDisabled();
  });
});
