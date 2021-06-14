import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testing the <FavoritePokemons', () => {
  test('renders no favorite pokemon found when theres no favorite', () => {
    renderWithRouter(<App />);

    const pageFavorite = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(pageFavorite);

    const noFavorite = screen.getByText(/no favorite pokemon found/i);

    expect(noFavorite).toBeInTheDocument();
  });

  test('renders all the favorite pokemon cards', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const addFav = screen.getByText(/pokémon favoritado?/i);

    userEvent.click(addFav);

    const pageFavorite = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(pageFavorite);

    const favoritadedPokemon = screen.getByTestId(/pokemon-name/);

    expect(favoritadedPokemon).toBeInTheDocument();
  });

  test('not rendering pokemon cards if theres no favorite', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const addFav = screen.getByText(/pokémon favoritado?/i);

    userEvent.click(addFav);

    const pageFavorite = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(pageFavorite);

    const notFoundText = screen.getByText(/no favorite pokemon found/i);

    expect(notFoundText).toBeInTheDocument();
  });
});

// describe('testing the component X', () => {
//     test('', () => {});
//     test('', () => {});
//     test('', () => {});
//     test('', () => {});
//     test('', () => {});
//   });
