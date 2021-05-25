import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa todo o Componente "FavoritePokemons"', () => {
  test('Teste se é exibido na tela a mensagem "No favorite pokemon found",'
  + 'se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<App />);
    const favoritePage = screen.getByText(/Favorite Pokémons/);

    userEvent.click(favoritePage);

    const text = screen.getByText(/No favorite pokemon found/i);

    expect(text).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const details = screen.getByText('More details');

    userEvent.click(details);

    const favorite = screen.getByText(/Pokémon favoritado?/i);

    userEvent.click(favorite);

    const favoritePage = screen.getByText('Favorite Pokémons');

    userEvent.click(favoritePage);

    const favoritedPokemon = screen.getByTestId('pokemon-name');

    expect(favoritedPokemon).toBeInTheDocument();
  });

  test('Teste se nenhum card de pokémon é exibido,'
  + 'se ele não estiver favoritado.', () => {
    renderWithRouter(<App />);
    const details = screen.getByText('More details');

    userEvent.click(details);

    const favorite = screen.getByText(/Pokémon favoritado?/i);

    userEvent.click(favorite);

    const favoritePage = screen.getByText('Favorite Pokémons');

    userEvent.click(favoritePage);

    const text = screen.getByText(/No favorite pokemon found/i);

    expect(text).toBeInTheDocument();
  });
});
