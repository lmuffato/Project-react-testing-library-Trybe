import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('tests `Pokemon` component ', () => {
  test('render a card with information about a specific pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const name = screen.getByTestId('pokemon-name');
    expect(name.textContent).toBe('Pikachu');

    const type = screen.getByTestId('pokemon-type');
    expect(type.textContent).toBe('Electric');

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight.textContent).toBe('Average weight: 6.0 kg');

    const image = screen.getByAltText('Pikachu sprite');
    expect(image).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('card contains a nav link with pokemon details at `/pokemons/<id>`', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const nav = screen.getByText(/More Details/i);
    expect(nav).toBeInTheDocument();
    userEvent.click(nav);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Has a star icon on favorite pokemons', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const favorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(favorite).toHaveAttribute('src',
      '/star-icon.svg');
  });
});
