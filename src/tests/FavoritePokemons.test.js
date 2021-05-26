import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Verificar a página de Pokemons Favoritos', () => {
  it('deve renderizar a pagina de favoritos vazia', () => {
    const { getByRole, getByText } = renderWithRouter(<FavoritePokemons />);
    const h2 = getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/i,
    });
    const paragraph2 = getByText('No favorite pokemon found');

    expect(h2).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
});
