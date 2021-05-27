import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Test the "FavoritePokemons" component - Requirement 3', () => {
  it('check if the right message is rendered when none pokemon is favorited', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  it('check if the "FavoritePokemons" component works properly', () => {
    // Acessar os elementos da sua tela
    const {
      getAllByRole, getByLabelText, getByAltText, getByText, history,
    } = renderWithRouter(<App />);

    const navElement = getAllByRole('link');
    // Interagir com eles (se houver necessidade)
    userEvent.click(navElement[2]);
    // Fazer seu teste
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
    // Interagir com eles (se houver necessidade)
    userEvent.click(navElement[0]);
    const moreDetails = getByText(/More details/i);
    userEvent.click(moreDetails);
    const favoriteCheckbox = getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCheckbox);
    userEvent.click(navElement[2]);
    const favoritedPokemons = getByAltText(/is marked as favorite/i);
    expect(favoritedPokemons).toBeInTheDocument();
  });
});

// Acessar os elementos da sua tela
// Interagir com eles (se houver necessidade)
// Fazer seu teste
