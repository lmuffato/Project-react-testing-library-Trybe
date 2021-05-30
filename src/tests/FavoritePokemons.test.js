import React from 'react';
import renderWithRouter from '../RenderWithRouter';
import { FavoritePokemons } from '../components';

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const heading = getByText(/No favorite pokemon found/i);
  expect(heading).toBeInTheDocument();
});
