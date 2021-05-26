import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('testa se a página contém titulo "Favorite pokémons', () => {
    renderWithRouter(<FavoritePokemons />);
    const titleFav = screen.getByRole('heading', { name: 'Favorite pokémons', level: 2 });
    expect(titleFav).toBeInTheDocument();
  });
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const noPokemons = screen.getByText('No favorite pokemon found');
    expect(noPokemons).toBeInTheDocument();
  });
});
