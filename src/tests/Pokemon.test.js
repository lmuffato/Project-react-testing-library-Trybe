import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('render pokemon card itens', () => {
  it('render pokemon name', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });

  it('render pokemon type', () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toMatch(/electric/i);
  });

  it('render pokemon weight', () => {
    renderWithRouter(<App />);
    const pokemonWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(pokemonWeight).toBeInTheDocument();
  });

  it('render pokemon sprite', () => {
    renderWithRouter(<App />);
    const pokemonImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImg)
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
    expect(pokemonImg).toBeInTheDocument();
  });

  it('render link more details', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const pathResource = history.location.pathname;
    expect(pathResource).toBe('/pokemons/25');
  });

  it('render star', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);
    const favoriteStarImg = screen
      .getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoriteStarImg).toBeInTheDocument();
    const starURL = '/star-icon.svg';
    expect(favoriteStarImg).toHaveAttribute('src', starURL);
    expect(favoriteStarImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
