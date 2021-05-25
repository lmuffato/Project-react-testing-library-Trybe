import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Favorites pokemons tests', () => {
  it('Favorite pokemons with no favorite pokemon', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/favorites');
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
