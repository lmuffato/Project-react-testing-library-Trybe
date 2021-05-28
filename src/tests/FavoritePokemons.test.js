import { render } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../components';

describe('Testando o component Favorite Pokemons', () => {
  test('Se é exibido na tela se a pessoa nao tem pokemons favoritos', () => {
    const { getByText } = render(<FavoritePokemons />);
    const mensagem = getByText('No favorite pokemon found');
    expect(mensagem).toBeInTheDocument();
  });
  test('Teste se nenhum card de pokémon é exibido,se nao tiver favoritos', () => {
    const { getAllByRole } = render(<FavoritePokemons />);
    const favoritos = getAllByRole('p');
    expect(favoritos.length).toBe(0);
  });
});
