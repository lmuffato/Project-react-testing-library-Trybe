import React from 'react';
// import { getByRole } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa os elementos da componente FavoritePokemons', () => {
  it('Teste se a página contém um titulo h2 com o texto "Favorite pokémons".', () => {
    const { getByRole } = renderWithRouter(<FavoritePokemons />);
    const titleH2 = getByRole('heading', {
      name: 'Favorite pokémons',
      level: 2,
    });
    expect(titleH2).toBeInTheDocument();
  });

  it('Na ausência de pokemons favoritos, deve exibir a mensagem'
    + '"No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavoriteMsg = getByText(/No favorite pokemon found/);
    expect(noFavoriteMsg).toBeInTheDocument();
  });
});
