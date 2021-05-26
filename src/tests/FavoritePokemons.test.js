import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('testing the component "Favorite Pokémons"', () => {
  it(`testing the rederization of the message 
  "No favorite pokemon found" if there are no favorite pokemon`, () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFoundFavorite = getByText('No favorite pokemon found');

    expect(notFoundFavorite).toBeInTheDocument();
  });

  it('Test whether all your favorite Pokémon cards are displayed', () => {
    const { getByText, getByLabelText, getByTestId, history } = renderWithRouter(<App />);

    const moreDetails = getByText(/more details/i);
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const radioFavorite = getByLabelText('Pokémon favoritado?');
    userEvent.click(radioFavorite);
    expect(radioFavorite).toBeChecked();

    history.push('/favorites');
    const pokemon = getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument();
  });
});
