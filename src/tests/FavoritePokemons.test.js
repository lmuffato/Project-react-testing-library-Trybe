import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

describe('testa a pagina de pokemonsfavoritos.', () => {
  it('testa se existem pokemons favoritos.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFound = getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
});
