import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import Pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Componente FavoritePokemons', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const text = getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getAllByText } = renderWithRouter(<FavoritePokemons pokemons={ Pokemons } />);
    const word = getAllByText(/More details/i);
    expect(word).toBeDefined();
  });

  test('Teste se é exibido os cards de dois pokemons favoritados', () => {
    const filter1 = Pokemons[2];
    const filter2 = Pokemons[3];
    const { getAllByText } = renderWithRouter(<FavoritePokemons
      pokemons={ [filter1, filter2] }
    />);
    const word = getAllByText(/More details/i);
    expect(word).toBeDefined();
  });
});
