import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('tests for the Pokemon component', () => {
  test('Test whether a card with the information for a Pokémon is rendered', () => {
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

  test('Test if the Pokémon card on the Pokédex contains a navigation link', () => {
    const { history, getByText } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const navLink = getByText(/More Details/i);
    expect(navLink).toBeInTheDocument();

    userEvent.click(navLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Test if there is a star icon on favorite Pokemons', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );

    const favoritePokemon = getByAltText(/Pikachu is marked as favorite/);
    expect(favoritePokemon).toHaveAttribute('src',
      '/star-icon.svg');
  });
});
