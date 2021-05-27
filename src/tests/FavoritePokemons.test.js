import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

const renderAppWithRouter = () => renderWithRouter(<App />);
const renderFavoriteWithRouter = () => renderWithRouter(<FavoritePokemons />);

describe('FavoritePokemons.test.js', () => {
  test('Exibe "No favorite pokemon found" quando não há Pokemon favorito', () => {
    const { getByText } = renderFavoriteWithRouter();
    const noPokeFav = getByText('No favorite pokemon found');
    expect(noPokeFav).toBeInTheDocument();
  });
  test('Quando pokemon é adicionado aos favoritos, exibe na pagina de Favoritos', () => {
    const { getByText, getByRole, getByLabelText } = renderAppWithRouter();
    userEvent.click(getByRole('link', { name: /more details/i }));
    userEvent.click(getByLabelText(/pokémon favoritado?/i));
    userEvent.click(getByRole('link', { name: /home/i }));
    userEvent.click(getByRole('button', { name: /fire/i }));
    userEvent.click(getByRole('link', { name: /more details/i }));
    userEvent.click(getByLabelText(/pokémon favoritado?/i));
    userEvent.click(getByRole('link', { name: /favorite pokémons/i }));
    const pokemonsFavorited = [getByText(/pikachu/i), getByText(/charmander/i)];
    pokemonsFavorited.forEach((pokemon) => expect(pokemon).toBeInTheDocument());
  });
});
