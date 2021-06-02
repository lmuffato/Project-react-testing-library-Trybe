import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import Pokemons from '../data';

describe('Testando o componete', () => {
  it('A mensagem "No favorite pokemon found" deve aparecer na tela.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const paragrafoDeErro = getByText(/no favorite pokemon found/i);
    expect(paragrafoDeErro).toBeInTheDocument();
  });

  it('Verifica se os cards são renderizado na tela.', () => {
    const { getAllByText } = renderWithRouter(<FavoritePokemons pokemons={ Pokemons } />);
    const detailsLink = getAllByText(/average weight:/i);
    expect(detailsLink).toBeDefined();
  });
});
