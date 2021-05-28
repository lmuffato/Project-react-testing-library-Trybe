import React from 'react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// Requisito Realizado com ajuda de Pollyana Oliveira Turma 10A
describe('Testing Component FavoritePokemons', () => {
  it('Should have a msg saying "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavorite = getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });

  it('Testing if there is favorite pokemon marked', () => {
    const { getByRole, getByText, getByTestId } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(moreDetails);

    const checkbox = getByText('Pokémon favoritado?');
    userEvent.click(checkbox);

    const weight = getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
  });
});
