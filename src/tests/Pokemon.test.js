import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from './mockPokemons';

describe('test the pokemon component', () => {
  test('if the pokemon name is pikachu', () => {
    const { getByTestId } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/pikachu/i);
  });
  test('if the pokemon type is Electric', () => {
    const { getByTestId } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/electric/i);
  });
  test('if the pokemon has the right weight', () => {
    const { getByTestId } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const pokemonType = getByTestId('pokemon-weight');
    expect(pokemonType).toHaveTextContent(/6.0 kg/i);
  });
  test('if the image of the pokemon is in the document', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const image = getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(pokemons[0].image);
  });
  test('if when favorite the star image is in the document', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const image = getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('http://localhost/star-icon.svg');
  });
  test('if more details get clicked the PokemonDetails is rendered', () => {
    const { getByText, history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const moreDetailsLink = getByText(/more details/i);
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
});
