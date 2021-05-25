import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../components/helper';

describe('Testa a tela de favoritos', () => {
  it('Testa se exibe a mensagem caso não haja pokemons salvos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const msg = 'No favorite pokemon found';
    const notFound = getByText(msg);

    expect(notFound).toBeInTheDocument();
  });
  it('Testa se exibe os pokemons adicionados', () => {
    const { history, getByText, getByTestId } = renderWithRouter(<App />);
    userEvent.click(getByText('More details'));
    userEvent.click(getByText('Pokémon favoritado?'));
    history.push('/favorites');
    const name = getByTestId('pokemon-name');

    expect(name).toHaveTextContent('Pikachu');
  });
});
