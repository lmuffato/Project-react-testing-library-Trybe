import React from 'react';
// import { screen } from '@testing-library/dom';
import RenderWithRouter from './RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    const { getByText } = RenderWithRouter(<FavoritePokemons />);
    const noFavorite = getByText(/no favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

/*   test('Testa se a lista de favoritos aparece', () => {
    const { history } = RenderWithRouter(<FavoritePokemons />);
    const about = getByRole('link', {
      name: /about/i,
    });
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  }); */
});
