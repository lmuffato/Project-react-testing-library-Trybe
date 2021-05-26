import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helpers/renderWithRouter';

describe('3. Testando componente FavoritePokemon', () => {
  test('Verificar se a mensagem correta é mostrada quando não há favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const notFoundMsg = getByText('No favorite pokemon found');
    expect(notFoundMsg).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, getByRole, getByTestId, history } = renderWithRouter(<App />);

    const moreDetails = getByText('More details');
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    expect(history.location.pathname).toBe('/pokemons/25');

    const favoriteCheckbox = getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);

    history.push('/favorites');
    expect(history.location.pathname).toBe('/favorites');

    expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.0 kg');
  });

  test('Nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {});
});
