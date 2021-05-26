import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoritePokemon = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoritePokemon).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    // implementar  test
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    // implementar test
  });
});
