import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';

test('Teste - No favorite pokemon found, se não houverem pokémons favoritos', () => {
  const { getByText } = render(<FavoritePokemons />);
  const favPoks = getByText('No favorite pokemon found');
  expect(favPoks).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados', () => {
  const { getByText } = render(
    <MemoryRouter>
      <FavoritePokemons pokemons={ data } />
    </MemoryRouter>,
  );
  const catchInPikachu = getByText(/Pikachu/);
  const catchInCharmander = getByText(/Charmander/);
  expect(catchInPikachu).toBeInTheDocument();
  expect(catchInCharmander).toBeInTheDocument();
});

test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
  const { queryByText, getByText } = render(
    <MemoryRouter>
      <FavoritePokemons pokemons={ [] } />
    </MemoryRouter>,
  );
  const notFoundFav = getByText(/No favorite pokemon found/);
  expect(notFoundFav).toBeInTheDocument();
  const catchInPikachu = queryByText(/Pikachu/);
  const catchInCharmander = queryByText(/Charmander/);
  expect(catchInPikachu).not.toBeInTheDocument();
  expect(catchInCharmander).not.toBeInTheDocument();
});
