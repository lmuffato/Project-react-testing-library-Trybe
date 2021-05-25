import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

describe('Requirement 2', () => {
  it('Page has informations about the Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const informationsAbout = getByText('About Pokédex');
    expect(informationsAbout).toBeInTheDocument();
  });

  it('Page has an h2 with the text "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutH2 = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(aboutH2).toBeInTheDocument();
  });

  it('Page has two paragraphs with some text about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const aboutFirstParagraph = getByText(/This application simulates a Pokédex/i);
    expect(aboutFirstParagraph).toBeInTheDocument();

    const aboutSecondParagraph = getByText(/One can filter Pokémons by type/i);
    expect(aboutSecondParagraph).toBeInTheDocument();
  });

  it('Page has the following image of a Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImage = getByAltText(/Pokédex/i);
    expect(pokedexImage).toHaveAttribute('src', imgURL);
    expect(pokedexImage).toBeInTheDocument();
  });
});
