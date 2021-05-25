import React from 'react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('testing the component About', () => {
  it('Test if the page contains information about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const informations = getByText(/This application simulates a Pokédex/i);

    expect(informations).toBeInTheDocument();
  });

  it('Test if the page contains an h2 heading with the text "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      name: /about pokédex/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('Test if the page contains two paragraphs with text about the Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = getByText(/This application simulates a Pokédex/i);
    const secondParagraph = getByText(/One can filter Pokémons by type/i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Test if the page contains the Pokédex image', () => {
    const { getByAltText, getByRole } = renderWithRouter(<About />);
    const image = getByAltText('Pokédex');
    const srcImage = getByRole('img');

    expect(image).toBeInTheDocument();
    expect(srcImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
