import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente "FavoritePokemons"', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found, 
    se a pessoa não tiver pokémons favoritos.`, () => {
    const { getByText } = render(<FavoritePokemons />);
    const messageDefault = getByText('No favorite pokemon found');

    expect(messageDefault).toBeInTheDocument();
  });
});
