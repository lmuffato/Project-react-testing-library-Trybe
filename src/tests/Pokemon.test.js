import { fireEvent } from '@testing-library/dom';
import React from 'react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const isPokemonFavoriteById = pokemons.map(() => true);
const pokemon = pokemons[0];
describe('Resquest 6: Test component Pokemon', () => {
  it('renders card Pokémon', () => {
    const { value, measurementUnit } = pokemon.averageWeight;
    const { getByText, getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ isPokemonFavoriteById[0] }
    />);
    const namePokemon = getByText(pokemon.name);
    const typePokemon = getByText(pokemon.type);
    const weightPokemon = getByText(`Average weight: ${value} ${measurementUnit}`);
    const imagePokemon = getByRole('img', {
      name: `${pokemon.name} sprite`,
    });
    const url = pokemon.image;
    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toBeInTheDocument();
    expect(weightPokemon).toBeInTheDocument();
    expect(imagePokemon).toBeInTheDocument();
    expect(imagePokemon).toHaveAttribute('src', url);
  });
  it('card contains a link to navigate to details', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ isPokemonFavoriteById[0] }
    />);
    const moreDetails = getByRole('link', {
      name: 'More details',
    });
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    console.log(pathname);
    const url = `/pokemons/${pokemon.id}`;
    expect(pathname).toBe(url);
  });
  it('renders star icon on favorite Pokémon', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ isPokemonFavoriteById[0] }
    />);
    const image = getByRole('img', {
      name: `${pokemon.name} is marked as favorite`,
    });
    const url = '/star-icon.svg';
    expect(image).toHaveAttribute('src', url);
  });
});
