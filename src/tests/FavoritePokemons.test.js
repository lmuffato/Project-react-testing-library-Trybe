import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter.helper';
import { FavoritePokemons } from '../components';
import App from '../App';

const pokemonName = 'pokemon-name';
const favorites = '/favorites';

describe('Requisito 3', () => {
  test('é exibido na tela a mensagem No favorite pokemon found,'
    + 'se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);

    const favoritePokemon = screen.getByText(/pokemon found/i);
    expect(favoritePokemon).toBeInTheDocument();
    expect(favoritePokemon).toHaveTextContent(/No favorite pokemon found/i);
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const h2Summary = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(h2Summary).toHaveTextContent(/summary/i);

    let inputFavoritePokemon = screen.getByRole('checkbox');
    expect(inputFavoritePokemon).toBeInTheDocument();
    userEvent.click(inputFavoritePokemon);

    history.push(favorites);

    let favoritePokemons = screen.getAllByTestId(pokemonName);
    expect(favoritePokemons).toHaveLength(1);
    expect(inputFavoritePokemon).not.toHaveTextContent(/No favorite pokemon found/i);

    history.push('/pokemons/23');
    inputFavoritePokemon = screen.getByRole('checkbox');
    userEvent.click(inputFavoritePokemon);

    history.push(favorites);
    favoritePokemons = screen.getAllByTestId(pokemonName);
    expect(favoritePokemons).toHaveLength(2);
    expect(inputFavoritePokemon).not.toHaveTextContent(/No favorite pokemon found/i);
  });

  test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.',
    () => {
      const { history } = renderWithRouter(<App />);

      const moreDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetails);

      let inputFavoritePokemon = screen.getByRole('checkbox');
      expect(inputFavoritePokemon).toBeInTheDocument();
      userEvent.click(inputFavoritePokemon);

      history.push(favorites);

      const favoritePokemons = screen.getAllByTestId(pokemonName);
      expect(favoritePokemons).toHaveLength(1);
      expect(inputFavoritePokemon).not.toHaveTextContent(/No favorite pokemon found/i);

      history.push('/pokemons/23');
      inputFavoritePokemon = screen.getByRole('checkbox');
      userEvent.click(inputFavoritePokemon);

      history.push(favorites);
      const favoritePokemon = screen.getByText(/pokemon found/i);
      expect(favoritePokemon).toBeInTheDocument();
      expect(favoritePokemon).toHaveTextContent(/No favorite pokemon found/i);
    });
});
