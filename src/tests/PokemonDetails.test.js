import React from 'react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../helper/renderWithRouter';
import { pokemonDetailsData } from '../services/dataTest';

import App from '../App';

describe('Requirement 7 - renders Pokemon', () => {
  const { headings, resume, maps } = pokemonDetailsData;
  const pathPokemon = '/pokemons/25';

  it('renders pokemon headings and paragraphs', () => {
    const { history, getByRole, getByText } = renderWithRouter(<App />);

    history.push(pathPokemon);

    headings.forEach((heading) => {
      const header = getByRole('heading', { name: heading });
      expect(header).toHaveTextContent(heading);
    });

    const paragraphResume = getByText(resume);
    expect(paragraphResume).toHaveTextContent(resume);
  });

  it('renders pokemon maps', () => {
    const { history, getAllByRole, getByText } = renderWithRouter(<App />);

    history.push(pathPokemon);

    maps.forEach((map, index) => {
      const { alt, src, mapName } = map;

      const imgMapPosition = index + 1;
      const imgMap = getAllByRole('img')[imgMapPosition];
      expect(imgMap).toHaveAttribute('src', src);
      expect(imgMap).toHaveAttribute('alt', alt);

      const locationName = getByText(mapName);
      expect(locationName).toHaveTextContent(mapName);
    });
  });

  it('renders a star icon when it clicks in the checkbox', () => {
    const { history, getByLabelText, getByRole } = renderWithRouter(<App />);

    history.push(pathPokemon);

    const checkBoxFavorite = getByLabelText(/pokémon favoritado\?/i);
    userEvent.click(checkBoxFavorite);

    const starIcon = getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(starIcon).toBeInTheDocument();

    userEvent.click(checkBoxFavorite);
  });
});
