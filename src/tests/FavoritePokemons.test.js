import React from 'react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);

  const text = getByText(/No favorite pokemon found/i);
  expect(text).toBeInTheDocument();
});
