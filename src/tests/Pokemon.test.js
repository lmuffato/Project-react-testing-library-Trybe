import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('tests Pokemon.js', () => {
  test('verifies if a pokemon info card is rendered', () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } />,
    );

    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe('Pikachu');

    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe('Electric');

    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');

    const pokemonImage = getByAltText('Pikachu sprite');
    expect(pokemonImage).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('tests nav link to pokemon details (/pokemons/<id>)', () => {
    const { history, getByText } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const navLink = getByText(/More Details/i);
    expect(navLink).toBeInTheDocument();
    userEvent.click(navLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('tests the star icon', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const favoritePokemon = getByAltText(/Pikachu is marked as favorite/);
    expect(favoritePokemon).toHaveAttribute('src',
      '/star-icon.svg');
  });
});
