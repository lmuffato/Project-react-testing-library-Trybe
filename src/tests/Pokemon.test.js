import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

const pikachu = pokemons.find((pokemon) => pokemon.name === 'Pikachu');

describe('Pokemon Test', () => {
  test('testando pokemon card', () => {
    const {
      name,
      type,
      image,
      averageWeight: { value, measurementUnit },
    } = pikachu;
    const { getByText, getByAltText, getByTestId } = renderWithRouter(<Pokemon
      pokemon={ pikachu }
      isFavorite={ false }
    />);
    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(type)).toBeInTheDocument();
    expect(getByAltText(`${name} sprite`).getAttribute('src')).toBe(image);
    expect(getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });

  test('test more details link', () => {
    const { id } = pikachu;
    const { getByText, history } = renderWithRouter(<Pokemon
      pokemon={ pikachu }
      isFavorite={ false }
    />);
    const detailsLink = getByText(/More details/);
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('favorite icon test', () => {
    const { name } = pikachu;
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pikachu }
      isFavorite
    />);
    const favoIcon = getByAltText(`${name} is marked as favorite`);
    expect(favoIcon).toBeInTheDocument();
    expect(favoIcon.getAttribute('src')).toBe('/star-icon.svg');
  });
});
