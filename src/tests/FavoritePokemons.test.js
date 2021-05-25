import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('shows the message "No favorite pokemon found" correctly', () => {
  render(<FavoritePokemons pokemons={ [] } />);

  const info = screen.getByText('No favorite pokemon found');
  expect(info).toBeInTheDocument();
});

it('shows favorite pokémons correctly', () => {
  const { getByRole } = renderWithRouter(<App />);

  const pikachuMoreDetails = getByRole('link', {
    name: 'More details',
  });

  userEvent.click(pikachuMoreDetails);

  const pikachuFavoriteCheckbox = getByRole('checkbox', {
    name: 'Pokémon favoritado?',
  });

  userEvent.click(pikachuFavoriteCheckbox);

  const Home = getByRole('link', {
    name: 'Home',
  });

  userEvent.click(Home);

  const dragonTypeButton = getByRole('button', {
    name: 'Dragon',
  });

  userEvent.click(dragonTypeButton);

  const dragonairMoreDetails = getByRole('link', {
    name: 'More details',
  });

  userEvent.click(dragonairMoreDetails);

  const dragonairFavoriteCheckbox = getByRole('checkbox', {
    name: 'Pokémon favoritado?',
  });

  userEvent.click(dragonairFavoriteCheckbox);

  const favoritePokemons = getByRole('link', {
    name: 'Favorite Pokémons',
  });

  userEvent.click(favoritePokemons);

  const pikachu = screen.getByText('Pikachu');
  const dragonair = screen.getByText('Dragonair');

  expect(pikachu).toBeInTheDocument();
  expect(dragonair).toBeInTheDocument();
});
