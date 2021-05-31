import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../components/renderWithRouter';
import Pokemons from '../data';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  it('Testa se é exibido erro, caso a pessoa não tiver pokémons favoritos.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const error = getByText('No favorite pokemon found');

    expect(error).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    const { getAllByText } = renderWithRouter(<FavoritePokemons pokemons={ Pokemons } />);
    const details = getAllByText(/More Details/i);

    expect(details).toBeDefined();
  });
});
