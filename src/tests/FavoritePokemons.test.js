import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

const renderAppWithRouter = () => renderWithRouter(<App />);
const renderFavoriteWithRouter = () => renderWithRouter(<FavoritePokemons />);

describe('FavoritePokemons.test.js', () => {
  test('Exibe "No favorite pokemon found" quando não há Pokemon favorito', () => {
    const { getByText } = renderFavoriteWithRouter();
    const noPokeFav = getByText('No favorite pokemon found');
    expect(noPokeFav).toBeInTheDocument();
  });
});
