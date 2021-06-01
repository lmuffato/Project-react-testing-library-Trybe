import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Tests About Page', () => {
  test('tests if there is h2 with the text "About Pokédex" ', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutHeading = getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutHeading).toBeInTheDocument();
  });

  test('verifies the existence of two <p> with the content found on About.js', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstP = getByText('This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons');
    expect(firstP).toBeInTheDocument();
    const secondP = getByText('One can filter Pokémons by type, '
    + 'and see more details for each one of them');
    expect(secondP).toBeInTheDocument();
  });

  test('tests is the image source is the given url', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText(/pokédex/i);
    expect(image).toBeInTheDocument();
    expect(image.src)
      .toMatch('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
  // consultei https://jestjs.io/pt-BR/docs/expect#tomatchregexp--string para usar o toMatch
});
