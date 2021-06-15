import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testa o component Favorite Pokemons ', () => {
  it('Testa se a página exibe a mensagem: No favorite pokemon found', () => {
    const { getByText, history } = renderWithRouter(<FavoritePokemons />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/No favorite pokemon found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
