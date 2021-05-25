import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

test('Teste se é exibido na tela a mensagem "No favorite pokemon found"', () => {
  const { getByRole, getByText } = renderWithRouter(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );
  const title = getByRole('heading', {
    level: 2,
    name: /Favorite pokémons/i,
  });
  const notFavorite = getByText('No favorite pokemon found');

  expect(title).toBeInTheDocument();
  expect(notFavorite).toBeInTheDocument();
});
