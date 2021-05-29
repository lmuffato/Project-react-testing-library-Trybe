import React from 'react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('FavoritePokemon tests', () => {
  test('testando, No favorite pokemon found, msg', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFound = getByText(/No favorite pokemon found/);
    expect(notFound).toBeInTheDocument();
  });
  /* para o seguinte teste, foi recomendado mockar o comportamento do usuario
  de selecionar um pokemon favoritado */
  test('testar se há somente pokemons favoritados', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    const pokeIdTest = ['65', '4', '143', '151'];
    const pokeNames = ['Alakazam', 'Charmander', 'Snorlax', 'Mew'];
    const selectPoke = (id) => {
      history.push(`/pokemons/${id}`);
      const checkBoxMarked = getByRole('checkbox');
      userEvent.click(checkBoxMarked);
    };
    pokeIdTest.forEach((id) => selectPoke(id));
    history.push('/favorites');
    pokeNames.forEach((name) => expect(getByText(name)).toBeInTheDocument());
  });
});
