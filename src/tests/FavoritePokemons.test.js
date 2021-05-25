import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('3. Testando componente FavoritePokemon', () => {
  test('Verificar se a mensagem correta é mostrada quando não há favoritos', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    const notFoundMsg = getByText('No favorite pokemon found');
    expect(notFoundMsg).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {});
  test('Nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {});
});
