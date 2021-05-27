import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import pokemons from '../data';
import FavoritePokemons from '../components/FavoritePokemons';

describe('testa FavoritePokemons component', () => {
  it('testa a mensagem quando não ha pokemons favoritados', () => {
    const { getByText } = render(<FavoritePokemons />);
    const noFavorites = getByText('No favorite pokemon found');
    expect(noFavorites).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = render(
      <BrowserRouter>
        <FavoritePokemons pokemons={ pokemons } />
      </BrowserRouter>,
    );
    pokemons.forEach(({ name }) => {
      const pokemonName = getByText(name);
      expect(pokemonName).toBeInTheDocument();
    });
  });
  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const { getByText } = render(
      <BrowserRouter>
        <FavoritePokemons />
      </BrowserRouter>,
    );
    pokemons.forEach(({ name }) => {
      expect(() => getByText(name)).toThrow('Unable to find an element');
    });
  });
});
