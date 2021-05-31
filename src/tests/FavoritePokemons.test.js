import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../components/renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Testa se é exibido erro, caso a pessoa não tiver pokémons favoritos.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const error = getByText('No favorite pokemon found');

    expect(error).toBeInTheDocument();
  });
});
