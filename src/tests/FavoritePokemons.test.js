import React from 'react';
import { screen, render } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

const simulatedFavoritePokemons = () => pokemons.filter(({ id }) => id % 2);

describe('3 - Testing the component <FavoritePokemons />', () => {
  test('\'no favorite pokemon found\' must be in the component at first', () => {
    render(<FavoritePokemons pokemons={ [] } />);

    const noFavorites = screen.getByText(/no favorite pokemon found/i);

    expect(noFavorites).toBeInTheDocument();
  });

  test('when we have favorites pokemons it must show their cards in the page', () => {
    renderWithRouter(<FavoritePokemons pokemons={ simulatedFavoritePokemons() } />);

    const favoritePage = screen.getByRole('heading', { name: /favorite pokémons/i });
    const pokemonsCard = screen.getAllByTestId('pokemon-name');
    const cardsLength = 5;

    expect(favoritePage).toBeInTheDocument();
    expect(pokemonsCard.length).toBe(cardsLength);
    expect(pokemonsCard[0]).toBeInTheDocument();
    expect(pokemonsCard[0].textContent).toBe('Pikachu');
  });

  test('when we have don\'t favorites pokemons it must show no cards in the page', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const favoritePage = screen.getByRole('heading', { name: /favorite pokémons/i });
    const noFavorites = screen.getByText(/no favorite pokemon found/i);

    expect(favoritePage).toBeInTheDocument();
    expect(noFavorites).toBeInTheDocument();
  });
});
