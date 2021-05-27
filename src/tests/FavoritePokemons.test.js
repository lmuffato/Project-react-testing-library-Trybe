import React from 'react';
import { screen, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Tests in FavoritePokemons.js', () => {
  it('message when don\'t have a favorite pokemon', () => {
    render(<FavoritePokemons />);
    const withoutFavoriteMessage = screen.getByText('No favorite pokemon found');
    expect(withoutFavoriteMessage).toBeInTheDocument();
  });
});
