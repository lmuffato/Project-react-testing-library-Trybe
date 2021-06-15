import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Favorite from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test(`Teste se é exibido na tela a mensagem 
        No favorite pokemon found, se a pessoa
        não tiver pokémons favoritos.`, () => {
    render(<Favorite />, { wrapper: MemoryRouter });
    screen.getByText(/No favorite pokemon found/i);
  });
});
