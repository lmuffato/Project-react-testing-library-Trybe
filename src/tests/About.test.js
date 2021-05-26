import React from 'react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('"About" page Tests', () => {
  test('Header', () => {
    const { getByRole } = renderWithRouter(<About />);

    const pageHeader = getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(pageHeader).toBeInTheDocument();
  });
  test('First Paragraph', () => {
    const { getByText } = renderWithRouter(<About />);
    const breakedSentence = getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');
    expect(breakedSentence).toBeInTheDocument();
  });

  test('Second Paragraph', () => {
    const { getByText } = renderWithRouter(<About />);
    const breakedSentence2 = getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');
    expect(breakedSentence2).toBeInTheDocument();
  });
  test('Pokedex Image', () => {
    const { getByAltText } = renderWithRouter(<About />);
    // https://testing-library.com/docs/queries/about Priority #2 - Semantic Queries
    const pokedexImg = getByAltText('Pokédex');

    expect(pokedexImg.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(pokedexImg).toBeInTheDocument();
  });
});
