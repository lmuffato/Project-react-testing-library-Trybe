import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('3. Testando componente FavoritePokemon', () => {
  test('Verificar se a mensagem correta é mostrada quando não há favoritos', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    const notFoundMsg = getByText('No favorite pokemon found');
    expect(notFoundMsg).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const history = createMemoryHistory();

    const { getByText, getByRole, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetails = getByText('More details');
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const favoriteCheckbox = getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);

    history.push('/favorites');
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.0 kg');
  });

  test('Nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {});
});
