import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('requisito 3', () => {
  test('testando favorite pokemon ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const noFavoriteMsg = screen.getByText('No favorite pokemon found');
    // verifica se a mensagem aparece
    expect(noFavoriteMsg).toBeInTheDocument();
  });

  test('Testando se os cards são exibidos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const input = screen.getByLabelText('Pokémon favoritado?');
    expect(input).toBeInTheDocument();
  });
});

// npx stryker run ./stryker/FavoritePokemons.conf.json
