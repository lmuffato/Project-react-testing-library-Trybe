import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../../renderWithRouter';
import App from '../App';

describe('testing FavoritePokemons component', () => {
  test('renders the message of "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoriteLink = getByText('Favorite Pokémons');
    userEvent.click(favoriteLink);
    const message = getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  test('renders all the cards of favorited pokemons', () => {
    const {
      getByText, history, getByLabelText, getAllByRole,
    } = renderWithRouter(<App />);

    const pokemons = [
      { pok: /pikachu/i, buttonPosition: 1 },
      { pok: /caterpie/i, buttonPosition: 3 },
    ];

    const testing = ({ pok, buttonPosition }) => {
      const button = getAllByRole('button')[buttonPosition];
      expect(button).toBeInTheDocument();
      userEvent.click(button);
      const pokemonName = getByText(pok);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(getByText('More details'));

      const checkFavorite = getByLabelText('Pokémon favoritado?');
      expect(checkFavorite).toBeInTheDocument();
      userEvent.click(checkFavorite);
      expect(checkFavorite).toBeChecked();
    };

    testing(pokemons[0]);

    history.push('/');
    expect(history.location.pathname).toBe('/');

    testing(pokemons[1]);

    history.push('/favorites');

    expect(getByText(/pikachu/i)).toBeInTheDocument();
    expect(getByText(/caterpie/i)).toBeInTheDocument();
  });

  test('does not render the pokemon card if it`s not favorited', () => {
    const {
      getByText, history, getByLabelText, getAllByRole,
    } = renderWithRouter(<App />);

    const button = getAllByRole('button')[1];
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const pokemon = getByText(/pikachu/i);
    expect(pokemon).toBeInTheDocument();
    userEvent.click(getByText('More details'));

    const checkFavorite = getByLabelText('Pokémon favoritado?');
    userEvent.click(checkFavorite);
    expect(checkFavorite).not.toBeChecked();

    history.push('/favorites');

    expect(pokemon).not.toBeInTheDocument();
  });
});
