import React from 'react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Test if Pokedex page', () => {
  it('contains a heading with the text: About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  it('contains two paragraphs', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');
    expect(firstParagraph).toBeInTheDocument();
    const secondParagraph = getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');
    expect(secondParagraph).toBeInTheDocument();
  });
  it('contains an image with the url requested', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText(/pokédex/i);
    expect(image).toBeInTheDocument();
    // Para conferir a url contei com a ajuda do Luan Ramalho.
    expect(image.src)
      .toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
