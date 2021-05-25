import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testig FavoritePokemon', () => {
  it('Testing message render with 0 pokemons selected', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  it('renders initial page with favorited pokemons', () => {
    const pokemons = [{
      averageWeight: { value: '6.0', measurementUnit: 'kg' },
      id: 25,
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
      name: 'Pikachu',
      type: 'Electric',
    }];
    const { getByRole, getByText } = renderWithRouter(<FavoritePokemons
      pokemons={ pokemons }
    />);

    const star = getByRole('img', { name: 'Pikachu is marked as favorite' });
    const name = getByText(/Pikachu/i);

    expect(star).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    // Creditos ao Bruno Mendes
  });
});
