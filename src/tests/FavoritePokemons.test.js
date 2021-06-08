import React from 'react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../components/renderWithRouter ';
import App from '../App';

describe('Teste componente FavoritePokemon', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText(/no favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, getByTestId, getByRole } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    userEvent.click(moreDetails);

    const check = getByRole('checkbox');
    userEvent.click(check);
    expect(check).toBeChecked();

    const favorite = getByText(/Favorite Pokémon/);
    userEvent.click(favorite);

    const poke = getByTestId('pokemon-name');
    expect(poke).toBeInTheDocument();
  });
});
