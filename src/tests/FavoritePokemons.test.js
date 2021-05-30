import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithHistory';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('testes do component FavoritePokemons.js', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon/i)).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados', () => {
    const { history, getByRole, queryByText,
      getByText } = renderWithRouter(<App />);

    const moreDetailsLink = getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');

    const checkboxFavorite = getByRole('checkbox', {
      name: /pokémon favoritado?/i,
    });

    userEvent.click(checkboxFavorite);

    expect(checkboxFavorite).toBeChecked();

    history.push('/favorites');
    expect(queryByText(/no favorite pokemon found/i)).not.toBeInTheDocument();

    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });
});
