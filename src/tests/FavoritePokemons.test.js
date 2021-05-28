import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FavoritePokemons } from '../components';

test('The page starts with the'
+ 'text "No favorite pokemon found"', () => {
  render(<FavoritePokemons />);

  const notFoundText = 'No favorite pokemon found';
  const paragraphNotFound = screen.getByText(notFoundText);
  expect(paragraphNotFound).toBeInTheDocument();
});

test('Show all the favorited Pokemons', () => {
  const historyMock = createMemoryHistory();
  render(
    <Router history={ historyMock }>
      <App />
    </Router>,
  );

  const favoritePokemonById = (id) => {
    historyMock.push(`/pokemons/${id}`);
    const bookmarkButton = screen.getByRole('checkbox');
    userEvent.click(bookmarkButton);
  };

  favoritePokemonById('25');
  favoritePokemonById('4');

  historyMock.push('/favorites');
  const pokemonCards = document.querySelectorAll('.favorite-pokemon');
  expect(pokemonCards.length).toEqual(2);
});
