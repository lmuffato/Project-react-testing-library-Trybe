// import { fireEvent } from '@testing-library/dom';
import React from 'react';
import FavoritePokemon from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Request 3: Test Favorite', () => {
  it('renders text `No favorite pokemon found`', () => {
    const { getByText } = renderWithRouter(<FavoritePokemon />);
    const notFavorite = getByText('No favorite pokemon found');
    expect(notFavorite).toBeInTheDocument();
  });
});
