import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

function getPathName({ location: { pathname } }) {
  return pathname;
}

describe('3 - Testing the component <FavoritePokemons />', () => {
  const favoritesRoute = '/favorites';

  test('\'no favorite pokemon found\' must be in the component', () => {
    render(<FavoritePokemons />);

    const noFavorites = screen.getByText(/no favorite pokemon found/i);

    expect(noFavorites).toBeInTheDocument();
  });

  test('when we have favorites pokemons it must show their cards in the page', () => {
    const { history } = renderWithRouter(<App />);

    let pathname = getPathName(history);
    expect(pathname).toBe('/');

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const pokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
    pathname = getPathName(history);

    expect(pathname).toBe('/pokemons/25');
    expect(pokemonDetails).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(favoriteCheckbox);
    userEvent.click(favoriteLink);

    const favoritePage = screen.getByRole('heading', { name: /favorite pokémons/i });
    pathname = getPathName(history);

    expect(pathname).toBe(favoritesRoute);
    expect(favoritePage).toBeInTheDocument();

    const pokemonsCard = screen.getAllByTestId('pokemon-name');
    const cardsLength = 1;

    expect(pokemonsCard.length).toBe(cardsLength);
    expect(pokemonsCard[0]).toBeInTheDocument();
    expect(pokemonsCard[0].textContent).toBe('Pikachu');
  });

  test('when we have don\'t favorites pokemons it must show no cards in the page', () => {
    const { history } = renderWithRouter(<App />);

    let pathname = getPathName(history);
    expect(pathname).toBe('/');

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favoriteLink);

    let favoritePage = screen.getByRole('heading', { name: /favorite pokémons/i });
    const pokemonsCard = screen.getAllByTestId('pokemon-name');
    pathname = getPathName(history);

    expect(pathname).toBe(favoritesRoute);
    expect(favoritePage).toBeInTheDocument();

    const moreDeatils = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDeatils);

    const pokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
    pathname = getPathName(history);

    expect(pathname).toBe('/pokemons/25');
    expect(pokemonDetails).toBeInTheDocument();

    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(favoriteCheckbox);
    userEvent.click(favoriteLink);

    const noFavorites = screen.getByText(/no favorite pokemon found/i);
    pathname = getPathName(history);
    favoritePage = screen.getByRole('heading', { name: /favorite pokémons/i });

    expect(pathname).toBe(favoritesRoute);
    expect(noFavorites).toBeInTheDocument();
    expect(favoritePage).toBeInTheDocument();
    expect(pokemonsCard[0]).not.toBeInTheDocument();
  });
});
