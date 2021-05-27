import React from 'react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requirement 03 - Testing FavoritePokemons', () => {
  const favoriteLink = '/favorites';
  const checkEmpty = () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavorite = getByText(/No favorite pokemon found/);
    expect(noFavorite).toBeInTheDocument();
  };

  it('should return a message if there are no favorite pokemons', () => {
    checkEmpty();
  });
  it('deveria exibir todos os cards de pokémons favoritados', () => {
    const { getByTestId, getByRole, history } = renderWithRouter(
      <App />,
    );
    const markFavorite = (id) => {
      history.push(`/pokemons/${id}`);
      const check = getByRole('checkbox');
      userEvent.click(check);
    };
    markFavorite('10');
    markFavorite('23');

    history.push(favoriteLink);
    const favoritePokemons = getByTestId('favorite-pokemons');
    expect(favoritePokemons.children.length).toBeGreaterThanOrEqual(2);
    markFavorite('10');
    markFavorite('23');
  });
  it('should return message if no card is rendered', () => {
    checkEmpty();
  });
});
