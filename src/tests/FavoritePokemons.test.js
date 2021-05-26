import React from 'react';
import renderWithRouter from './renderWithHistory';
import FavoritePokemons from '../components/FavoritePokemons';

describe('testes do component About.js', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon/i)).toBeInTheDocument();
  });
});
