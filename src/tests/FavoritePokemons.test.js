import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('page renders the message `No favorite pokemon found`', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  history.push('/favorites');
  const heading = getByRole('heading', {
    name: 'Favorite pokémons',
    level: 2,
  });
  expect(heading).toBeInTheDocument();

  const paragraph = screen.getAllByText(
    (content, element) => element.tagName.toLowerCase() === 'p'
    && content.includes('No favorite pokemon found'),
  );
  expect(paragraph).toHaveLength(1);
});

test('page renders a list of favorite Pokémons', () => {
  const { history } = renderWithRouter(<App />);

  const mockDetailPage = 25;

  history.push(`/pokemons/${mockDetailPage}`);

  userEvent.click(screen.getByText('Pokémon favoritado?'));
  expect(screen.getByLabelText('Pokémon favoritado?')).toBeChecked();

  history.push('/favorites');
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();

  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType).toBeInTheDocument();

  const pokemonWeight = screen.getByTestId('pokemon-weight');
  expect(pokemonWeight).toBeInTheDocument();
});
