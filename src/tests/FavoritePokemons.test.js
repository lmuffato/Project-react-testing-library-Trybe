import { screen } from '@testing-library/react';
import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Verifica se o componente FavoritePokemons ', () => {
  it('contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<FavoritePokemons />);
    const element = screen.getByRole('heading', { level: 2 });
    expect(element).toHaveTextContent('About Pokédex');
  });
});
