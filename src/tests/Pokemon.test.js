import React from 'react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

describe('Testing Component Pokemon', () => {
  it('testing informations of pokemon card', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Electric');
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
    const pokemonImg = getByAltText('Pikachu sprite');
    expect(pokemonImg.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Checking Pathname of pikachu card', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const detailsBtn = getByRole('link', {
      nome: /more details/i,
    });
    userEvent.click(detailsBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Checking if there is a favourite pokemon', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const favStar = getByAltText('Pikachu is marked as favorite');
    expect(favStar.src).toContain('/star-icon.svg');
    expect(favStar.alt).toBe('Pikachu is marked as favorite');
  });
});
