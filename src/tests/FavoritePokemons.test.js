import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './RenderWithRouter';

describe('Testes do componente FavoritePokemons', () => {
  test('Testa se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noPokemonFound = getByText(/No favorite pokemon found/i);
    expect(noPokemonFound).toBeInTheDocument();
  });
});
