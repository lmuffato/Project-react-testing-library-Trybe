import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Se é exibido a mensagem de erro, se não tiver pokémons favoritos.', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkclicked = getByText(/Favorite pokémons/i);
    userEvent.click(linkclicked);
    const text = getByText(/No favorite pokemon Found/i);
    expect(text).toBeInTheDocument();
  });
  test('Se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const linkclicked = getByText(/more details/i);
    userEvent.click(linkclicked);
    const checkbox = getByRole('checkbox');
    userEvent.click(checkbox);
    const linkfavorite = getByText(/Favorite Pokémons/i);
    userEvent.click(linkfavorite);
    const title = getByRole('heading', {
      name: /Favorite pokémons/i,
    });
    expect(title).toBeInTheDocument();
  });
});
