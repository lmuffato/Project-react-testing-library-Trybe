import React from 'react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../helper/renderWithRouter';
import { favoritedPokemonsData } from '../services/dataTest';

import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Requirement 3 - renders the FavoritePokemons', () => {
  const { favoritedPokemon, imgSrc } = favoritedPokemonsData;

  it('renders initial page without favorited pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const noFavoriteMsg = getByText(/no favorite pokemon found/i);
    expect(noFavoriteMsg).toBeInTheDocument();
  });

  it('renders initial page with favorited pokemons', () => {
    const { history, getByRole, getByText } = renderWithRouter(<App />);

    const linkToPokemonDetails = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkToPokemonDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const favoriteCheckbox = getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(favoriteCheckbox);

    const starIcon = getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(starIcon).toBeInTheDocument();

    const linkToFavorite = getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(linkToFavorite);

    favoritedPokemon.forEach((pokeInfo) => {
      const paragraphInfo = getByText(pokeInfo);
      expect(paragraphInfo).toBeInTheDocument();
    });

    const imgPokemon = getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(imgPokemon).toHaveAttribute('src', imgSrc);
  });
});
