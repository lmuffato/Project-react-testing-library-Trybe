import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        { component }
      </Router>,
    ),
    history,
  });
};

describe('Teste o componente <FavoritePokemons.js />', () => {
  it(' No favorite pokemon found, se a pessoa não tiver pokémons favoritos.', () => {
    const { getByText } = render(<FavoritePokemons />);
    const notFound = getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    const moreDetailsLink = getByText('More details');

    userEvent.click(moreDetailsLink);

    const checkPikachu = getByRole('checkbox');
    userEvent.click(checkPikachu);

    history.push('/pokemons/25');
    const doesExistPikachu = getByText('Pikachu');
    expect(doesExistPikachu).toBeInTheDocument();
  });

  it('Se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    global.localStorage.clear();
    const { getByText } = render(<FavoritePokemons />);
    const notFound = getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
});
