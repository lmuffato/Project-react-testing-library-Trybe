import React from 'react';
import renderWithRouter from '../render/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Try favorites pokemons', () => {
  test('Tes if has a h2', () => {
    const { getByRole } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    const favorite = getByRole('heading', { level: 2 });
    expect(favorite).toHaveTextContent(/favorite pokémons/i);
  });

  test('Test if render favorite pokemons', () => {
    const { queryAllByText } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    pokemons.forEach((__, index) => {
      const classText = queryAllByText((_, { className }) => className === 'pokemon');
      expect(classText[index]).toBeInTheDocument();
    });
  });

  test('Test mensagem', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
