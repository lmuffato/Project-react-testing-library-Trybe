import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Tests whether the information about the favorites pokemons is rendered', () => {
  it('renders the text (No favorite pokemon found) if no pokemon is favored.', () => {
    renderWithRouter(<FavoritePokemons />);
    const heading = screen.getByRole('heading', { name: /favorite pokémons/i });
    expect(heading).toBeInTheDocument();

    const text = screen.getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });
});
