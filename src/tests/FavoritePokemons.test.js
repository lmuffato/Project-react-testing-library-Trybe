import React from 'react';
import renderWithRouter from '../RenderWithRouter';
import { FavoritePokemons } from '../components';

test('Teste se é exibido na tela a mensagem ', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const heading = getByText(/No favorite pokemon found/i);
  expect(heading).toBeInTheDocument();
});
