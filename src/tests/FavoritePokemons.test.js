import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Requisito 3', () => {
  test('Testando se a mensagem `No favorite pokemon found` aparece na tela', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const text = 'No favorite pokemon found';
    const paragraph = getByText(text);
    expect(paragraph).toBeInTheDocument();
  });

  test('Testando se é exibido todos os cards favoritados', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const text = 'Pikachu';
    const paragraphName = getByText(text);
    expect(paragraphName).toBeInTheDocument();
    // screen.debug();
  });

//   test('Testando se nenhum card é exibido, se ele não estiver favoritado', () => {
//     const { getByAltText } = renderWithRouter(<FavoritePokemons pokemons={ '' } />);
//   });
});

// describe('Requisito 1', () => {
// });
//   test('', () => {});
