import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Test About page', () => {
  it('Test pokedex Image to exist an be the correct one', () => {
    const { getByRole } = renderWithRouter(<About />);
    const pokedexImg = getByRole('img');
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
  it('test if "About Pokédex" was shown at the screen ', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutPokedex = getByRole('heading', { name: 'About Pokédex' });
    expect(aboutPokedex).toBeInTheDocument();
  });
  it('test if theres 2 paragraphs about pokedex', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');
    expect(firstParagraph).toBeInTheDocument();
    const secondParagraph = getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');
    expect(secondParagraph).toBeInTheDocument();
  });
});
