import React from 'react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './RenderWithRouter';
import { pokemonData } from '../services/dataTest';

import App from '../App';

describe('Requirement 6 - renders Pokemon', () => {
  const { pokemonDisplayed } = pokemonData;
  const { pokemonInfo, pokemonImg } = pokemonDisplayed;

  it('renders pokemon name, type and weight', () => {
    const { getByTestId } = renderWithRouter(<App />);

    pokemonInfo.forEach(({ testId, textContent }) => {
      const pokemonParagraph = getByTestId(testId);
      expect(pokemonParagraph).toBeInTheDocument();
      expect(pokemonParagraph).toHaveTextContent(textContent);
    });
  });

  it('renders pokemon image', () => {
    const { getByRole } = renderWithRouter(<App />);

    const pokemonImage = getByRole('img', { name: pokemonImg.alt });
    expect(pokemonImage).toHaveAttribute('src', pokemonImg.src);
  });

  it('renders PokemonDetails when it clicks in the link', () => {
    const { history, getByRole } = renderWithRouter(<App />);

    const linkToDetails = getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkToDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const favoritedCheckbox = getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(favoritedCheckbox);

    const starIcon = getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});