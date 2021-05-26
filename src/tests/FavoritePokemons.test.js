import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('test all screen application of the FavoritePokemons', () => {
  it('"No favorite pokemon" found msg screen,if a person has no favorite pokemon',
    () => {
      const { getByText } = renderWithRouter(<FavoritePokemons />);
      const notFavorite = getByText(/No favorite pokemon found/i);
      expect(notFavorite).toBeInTheDocument();
    });
});

describe('Check card favorite pokémon', () => {
  it('screen card favorites', () => {
    const { getByText, getByAltText, getByTestId } = renderWithRouter(<App />);
    const details = getByText('More details');
    userEvent.click(details);
    const checkbox = getByText('Pokémon favoritado?');
    userEvent.click(checkbox);
    const favorite = getByText('Favorite Pokémons');
    userEvent.click(favorite);
    const pikachu = getByTestId('pokemon-name');
    const type = getByTestId('pokemon-type');
    const weight = getByTestId('pokemon-weight');
    const pikachuImg = getByAltText('Pikachu sprite');
    const pikachuAsFavorite = getByAltText('Pikachu is marked as favorite');
    expect(pikachu).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
    expect(pikachuImg).toBeInTheDocument();
    expect(pikachuAsFavorite).toBeInTheDocument();
  });
});
