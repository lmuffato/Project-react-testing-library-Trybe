import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('test component Pokémon', () => {
  it('Correct name of Pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe('Pikachu');
  });
  it('Correct Type of Pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe('Electric');
  });

  it('Correct Average weigth', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemonWeigth = getByTestId('pokemon-weight');
    expect(pokemonWeigth.textContent).toContain('6.0');
  });

  it('Have a Image of Pokemon', () => {
    renderWithRouter(<App />);
    const pokemonImage = document.querySelector('img');
    expect(pokemonImage.alt).toContain('Pikachu sprite');
    expect(pokemonImage.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Have a link to More Details about pokémon', () => {
    const { getByText, history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
    />);
    const detailsLink = getByText(/More Details/i);
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Have a Star of Favorite Pokemons', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const isFavorited = getByAltText('Pikachu is marked as favorite');

    expect(isFavorited.src).toBe('http://localhost/star-icon.svg');
    expect(isFavorited.alt).toBe('Pikachu is marked as favorite');
  });
});
