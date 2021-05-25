import React from 'react';
import { FavoritePokemons } from '../components';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

describe('FavoritePokemons.js', () => {
  it('testing pokemons', () => {
    const { getByText, queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
    expect(queryByText('More details')).not.toBeInTheDocument();
  });

  it('testing pokemons favorites or not', () => {
    data.shift();
    data.shift();
    data.shift();
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={ data } />);
    expect(queryByText('Pikachu')).not.toBeInTheDocument();
    expect(queryByText('Charmander')).not.toBeInTheDocument();
    expect(queryByText('Catepie')).not.toBeInTheDocument();
    expect(queryByText('Ekans')).toBeInTheDocument();
    expect(queryByText('Alakazam')).toBeInTheDocument();
    expect(queryByText('Mew')).toBeInTheDocument();
    expect(queryByText('Rapidash')).toBeInTheDocument();
    expect(queryByText('Snorlax')).toBeInTheDocument();
    expect(queryByText('Dragonair')).toBeInTheDocument();
  });
});
