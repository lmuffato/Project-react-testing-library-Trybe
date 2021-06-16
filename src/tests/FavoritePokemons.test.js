import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './RenderWithRouter';

describe('Testes pagina favorite pokemons', () => {
  test('teste se exibe testo padrao', () => {
    renderWithRouter(<FavoritePokemons />);

    const noPokemon = screen.getByText(/no favorite pokemon found/i);

    expect(noPokemon).toBeInTheDocument();
  });
});
