import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste do componente FavoritePokemons.js', () => {
  it('Sem um pokemon favorito, a mensagem "No favorite pokemon found" é exibida', () => {
    renderWithRouter(<FavoritePokemons />);

    const text = screen.getByText('No favorite pokemon found');

    expect(text).toBeInTheDocument();
  });

  it('É exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokemonDetails);

    const markFavoritePokemon = screen.getByRole('checkbox');
    userEvent.click(markFavoritePokemon);

    const homePage = screen.getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(homePage);

    const favoritePokemonsPage = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favoritePokemonsPage);

    const favoritePokemon = screen.getByRole('img', {
      name: /marked as favorite/i,
    });

    expect(favoritePokemon).toBeInTheDocument();
  });
});
