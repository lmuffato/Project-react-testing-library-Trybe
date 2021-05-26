import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('test the component composition', () => {
  const bool = true;
  it('pokemon name, weigth and type', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ pokemons[1] } />,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Charmander');
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Fire');
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 8.5 kg');
  });

  it('test the pokemon images', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemons[2] } isFavorite={ bool } />,
    );
    const images = getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', expect.stringMatching('https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png'));
    expect(images[0]).toHaveAttribute('alt', expect.stringMatching('Caterpie sprite'));
    expect(images[1]).toHaveAttribute('src', expect.stringMatching('/star-icon.svg'));
    expect(images[1]).toHaveAttribute('alt',
      expect.stringMatching('Caterpie is marked as favorite'));
  });

  it('test the detail link', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[3] } isFavorite={ bool } />,
    );
    const link = getByRole('link');
    userEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/23');
  });
});
