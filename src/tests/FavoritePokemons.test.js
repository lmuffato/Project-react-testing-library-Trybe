import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { readFavoritePokemonIds } from '../services/pokedexService';
import { FavoritePokemons } from '../components';

describe('/favorites tests', () => {
  it('renders a /favorites component, with no favorite pokemons ', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <FavoritePokemons />
      </Router>,
    );

    const noFavorite = getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
  it('renders a /favorites component, with n° favorite pokemons ', () => {
    const history = createMemoryHistory();
    const { queryAllByAltText } = render(
      <Router history={ history }>
        <FavoritePokemons />
      </Router>,
    );
    const NFavoritePoke = readFavoritePokemonIds();
    const PokeCards = queryAllByAltText(/is marked as favorite/i);
    expect(PokeCards.length).toBe(NFavoritePoke.length);
  });
  it('renders a /favorites component, without any containers', () => {
    const history = createMemoryHistory();
    const { queryAllByAltText } = render(
      <Router history={ history }>
        <FavoritePokemons />
      </Router>,
    );
    const PokeCards = queryAllByAltText(/is marked as favorite/i);
    expect(PokeCards.length).toBe(0);
  });
});
