import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Requisito 3 Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found.', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoritePoke = getByText(/Favorite Pokémons/i);
    userEvent.click(favoritePoke);
    const msg = getByText(/No favorite pokemon found/i);

    expect(msg).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards', () => {
    const { getByText, history, getByTestId } = renderWithRouter(<App />);
    userEvent.click(getByText(/More details/i));
    userEvent.click(getByText(/Pokémon favoritado?/i));
    history.push('/favorites');
    const card = getByTestId('pokemon-name');

    expect(card).toHaveTextContent('Pikachu');
  });
});
