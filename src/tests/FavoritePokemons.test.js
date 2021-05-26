import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('renderizar o componente FavoritePokemons', () => {
  it('deve verificar se tem pokemon favorito', () => {
    const { getByRole, getByText } = renderWithRouter(<FavoritePokemons />);

    const pokemonNotFound = getByText(/No favorite pokemon found/);
    const favoriteFound = getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/i,
    });
    expect(favoriteFound).toBeInTheDocument();
    expect(pokemonNotFound).toBeInTheDocument();
  });
});
