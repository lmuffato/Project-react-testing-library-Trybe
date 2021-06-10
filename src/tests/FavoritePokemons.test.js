import React from 'react';
import { fireEvent } from '@testing-library/dom';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const textNoFavorites = getByText('No favorite pokemon found');
  expect(textNoFavorites).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados', () => {
  const { getByText, getByLabelText } = renderWithRouter(<App />);
  const getDetails = getByText('More details');
  fireEvent.click(getDetails);
  const getFavorite = getByLabelText('Pokémon favoritado?');
  fireEvent.click(getFavorite);
  const { getAllByRole } = renderWithRouter(<FavoritePokemons />);
  const getImages = getAllByRole('img');
  expect(getImages.length).not.toBe(0);
});
