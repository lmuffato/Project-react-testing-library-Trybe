import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

test('should print No favorite pokemon found when user not have favorites pokés', () => {
  render(<FavoritePokemons />);
  const userNoFavPokemonsText = screen.getByText(/No favorite pokemon found/);

  expect(userNoFavPokemonsText).toBeInTheDocument();
});

test('should display all favorite pokés cards', () => {
  render(<App />, { wrapper: MemoryRouter });
  const detailsLink = screen.getByText(/More details/);
  userEvent.click(detailsLink);

  const checkbox = screen.getByRole('checkbox');
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  const favoritePokes = screen.getByText(/Favorite Pokémon/);
  userEvent.click(favoritePokes);

  const pokeOverview = screen.getByTestId('pokemon-name');
  expect(pokeOverview).toBeInTheDocument();
});
