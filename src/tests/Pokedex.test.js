import { fireEvent } from '@testing-library/dom';
import React from 'react';
import App from '../App';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const isPokemonFavoriteById = pokemons.map(() => false);
describe('Request 5: test component Pokedex', () => {
  it('renders a heading with the text `Encountered pokémons`', () => {
    // console.log(pokemons);
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
});

describe('Test button action', () => {
  it('renders button with text ´Próximo pokémon´', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const pokemonName = pokemons.map(({ name }) => name);
    const buttonProx = getByRole('button', {
      name: 'Próximo pokémon',
    });
    expect(buttonProx).toBeInTheDocument();
    pokemons.forEach(({ name: namePokemon }) => {
      expect(getByText(namePokemon)).toBeInTheDocument();
      fireEvent.click(buttonProx);
    });
    expect(getByText(pokemonName[0])).toBeInTheDocument();
  });

  it('renders button types', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);
    const filter = getAllByTestId('pokemon-type-button');
    const filterTypes = filter.map((type) => type.innerHTML);
    const types = [...filterTypes, 'All'];
    const nubFilter = filter.length;
    expect(filter.length).toBe(nubFilter);
    types.forEach((type) => {
      const button = getByRole('button', {
        name: type,
      });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(type);
    });
  });

  it('renders pokemons according to type', () => {
    const { getByRole, getByText, getAllByTestId } = renderWithRouter(<App />);
    const filterTypes = getAllByTestId('pokemon-type-button');
    console.log(filterTypes[0].name);
    const btnType = getByRole('button', {
      name: /all/i,
    });
    expect(btnType).toBeInTheDocument();
    expect(btnType).toHaveTextContent('All');
    fireEvent.click(btnType);
    const { name: PokemonName } = pokemons[0];
    const text = getByText(PokemonName);
    expect(text).toBeInTheDocument();
  });
});

describe('Renders Pokémon', () => {
  it('renders one pokémon', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const buttonProx = getByRole('button', {
      name: 'Próximo pokémon',
    });
    const pokemonName = pokemons.map(({ name }) => name);
    pokemonName.forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
      expect(getByText(name)).toHaveTextContent(name);
      fireEvent.click(buttonProx);
    });
  });
});
