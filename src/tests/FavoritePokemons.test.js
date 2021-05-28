import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('FavoritePokemons tests', () => {
  it('mostra uma pagina com "No favorite pokemon found" caso ocorra', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  it('mostra os pokemons favoritados', () => {
    // Dragonair Favoritado
    const favoritedPokemons = [pokemons[0]];
    const { getAllByText } = renderWithRouter(<FavoritePokemons
      pokemons={ favoritedPokemons }
    />);
    expect(getAllByText(/Average weight/i).length).toBe(1);
  });

  it('mostra os link `More details`', () => {
    // Dragonair Favoritado
    const favoritedPokemons = [pokemons[0]];
    const { getAllByRole } = renderWithRouter(<FavoritePokemons
      pokemons={ favoritedPokemons }
    />);
    expect(getAllByRole('link')).toHaveLength(1);
  });
});
