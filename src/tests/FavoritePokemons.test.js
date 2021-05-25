import { render, screen } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testes do componente FavoritePokemons', () => {
  test('Testa se a mensagem No Favorite Pokemon é exibida na tela', () => {
    render(<FavoritePokemons />);
    const noFavPokemon = screen.getByText(/No favorite pokemon found/i);
    expect(noFavPokemon).toBeInTheDocument();
  });
});
