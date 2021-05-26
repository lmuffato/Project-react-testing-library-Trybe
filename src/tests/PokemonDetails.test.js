import React from 'react';
import renderWithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const pokemonParam = {
  params: {
    id: 25,
  },
};

const pokemonIsFavorite = {
  25: false,
};

const summary1 = 'This intelligent Pokémon roasts hard berries with electricity to make';

const summary2 = ' them tender enough to eat.';

const summary = summary1 + summary2;

describe('testing the composition', () => {
  it('test the headings and paragraph summary', () => {
    const { getAllByRole, getByText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ pokemonParam }
        isPokemonFavoriteById={ pokemonIsFavorite }
      />,
    );
    const headings = getAllByRole('heading');
    expect(headings[0]).toHaveTextContent('Pikachu Details');
    expect(headings[1]).toHaveTextContent('Summary');
    expect(headings[2]).toHaveTextContent('Game Locations of Pikachu');
    const paragraph = getByText(summary);
    expect(paragraph).toBeInTheDocument();
  });

  it('testing the maps images', () => {
    const { getAllByRole } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ pokemonParam }
        isPokemonFavoriteById={ pokemonIsFavorite }
      />,
    );
    const images = getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', expect.stringMatching('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png'));
    expect(images[1]).toHaveAttribute('alt', expect.stringMatching('Pikachu location'));
    expect(images[2]).toHaveAttribute('src', expect.stringMatching('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'));
    expect(images[2]).toHaveAttribute('alt', expect.stringMatching('Pikachu location'));
  });

  it('test input checkbox', () => {
    const { getByLabelText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ pokemonParam }
        isPokemonFavoriteById={ pokemonIsFavorite }
      />,
    );
    const label = getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
  });
});
