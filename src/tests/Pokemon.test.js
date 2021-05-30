import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const pokeMock = pokemons[0];

describe('Test component <Pokemon />', () => {
  test('Test pokémon name, type, weight and image', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokeMock }
      isFavorite={ false }
    />);
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName.innerHTML).toBe(pokeMock.name);
    const pokeType = getByTestId('pokemon-type');
    expect(pokeType.innerHTML).toBe(pokeMock.type);
    const pokeWeight = getByTestId('pokemon-weight');
    const { value, measurementUnit } = pokeMock.averageWeight;
    expect(pokeWeight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
    const pokeImage = getByAltText(`${pokeMock.name} sprite`);
    expect(pokeImage.src).toBe(pokeMock.image);
  });
  test('Test link redirect to details page', () => {
    const { getByText, history } = renderWithRouter(<Pokemon
      pokemon={ pokeMock }
      isFavorite={ false }
    />);
    const link = getByText(/more details/i);
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokeMock.id}`);
  });
});
