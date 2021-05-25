import React from 'react';

import renderWithRouter from '../helper/renderWithRouter';

import { aboutData } from '../services/dataTest';

import About from '../components/About';

describe('Requirement 2 - renders the About', () => {
  const { pokedexInfos, imgSrc } = aboutData;

  it('renders pokedex heading', () => {
    const { getByRole } = renderWithRouter(<About />);

    const headingPokedex = getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(headingPokedex).toBeInTheDocument();
  });

  it('renders pokedex paragraphs', () => {
    const { getByText } = renderWithRouter(<About />);

    pokedexInfos.forEach((info) => {
      const paragraphInfo = getByText(info);
      expect(paragraphInfo).toBeInTheDocument();
    });
  });

  it('renders pokedex image', () => {
    const { getByRole } = renderWithRouter(<About />);

    const pokedexImg = getByRole('img', {
      name: /pokédex/i,
    });
    expect(pokedexImg).toHaveAttribute('src', imgSrc);
  });
});
