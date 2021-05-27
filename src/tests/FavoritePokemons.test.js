import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

test('Teste se é exibido na tela a mensagem "No favorite pokemon found"', () => {
  const { getByText, getByRole } = renderWithRouter(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );
  const textFavPoke = getByText('No favorite pokemon found');
  expect(textFavPoke).toBeInTheDocument();

  const heading = getByRole('heading', {
    level: 2,
    name: /Favorite pokémons/i,
  });
  expect(heading).toBeInTheDocument();
});
