import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('testa FavoritePokemons component', () => {
  it('testa a mensagem quando não ha pokemons favoritados', () => {
    const { getByText } = render(<FavoritePokemons />);
    const noFavorites = getByText('No favorite pokemon found');
    expect(noFavorites).toBeInTheDocument();
  });
});
