import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

const addToFavorites = (getByRole) => {
  const moreDetails = getByRole('link', { name: 'More details' });
  userEvent.click(moreDetails);
  const favoriteCheckbox = getByRole('checkbox');
  userEvent.click(favoriteCheckbox);
  const home = getByRole('link', { name: 'Home' });
  userEvent.click(home);
};
const clickNextButton = (getByRole) => {
  const nextPokemon = getByRole('button', { name: 'Próximo pokémon' });
  userEvent.click(nextPokemon);
};
const getAllFavorites = (getByRole, getAllByRole) => {
  const favoritesLink = getByRole('link', { name: 'Favorite Pokémons' });
  userEvent.click(favoritesLink);
  const favoritePokemons = getAllByRole('img', { name: /is marked as favorite/i });
  return favoritePokemons;
};
describe('Requisito 3 - Teste o componente <FavoritePokemons.js />',
  () => {
    it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
    se a pessoa não tiver pokémons favoritos`,
    () => {
      const { getByText } = renderWithRouter(<FavoritePokemons />);
      const message = getByText('No favorite pokemon found');
      expect(message).toBeInTheDocument();
    });
    it('Teste se é exibido todos os cards de pokémons favoritados',
      () => {
        const { getByRole, getAllByRole } = renderWithRouter(<App />);
        addToFavorites(getByRole);
        clickNextButton(getByRole);
        addToFavorites(getByRole);
        const favoritePokemons = getAllFavorites(getByRole, getAllByRole);
        expect(favoritePokemons.length).toBe(2);
      });
  });
