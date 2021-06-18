import React from 'react';
import About from '../components/About'
import renderWithRouter from '../render/renderWithRouter';

describe('Verify if the page has the informations', () => {
  test('Test if the page has a heading h2 with the text', () => {
    const { getByRole } = renderWithRouter(<About />);
    const headingText = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(headingText).toBeInTheDocument();
  })

  test('Test if the page has 2 p with text about pokedex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const paragQuant = getAllByText(/Pokémons/);
    expect(paragQuant.length).toBe(2);
  });

  test('Test if has image.', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const pokedexImage = getByAltText('Pokédex');
    expect(pokedexImage).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  })
})
