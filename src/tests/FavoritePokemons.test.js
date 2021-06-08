import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../components/renderWithRouter ';

describe('Teste componente FavoritePokemon', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText(/no favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
});
