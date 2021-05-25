import React from 'react';
import { About } from '../components';
import renderWithRouter from '../services/renderWithRouter';

describe('Testing page About', () => {
  it('Test if the page contains information about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const pokedex = getByText(/About Pokédex/i);

    expect(pokedex).toBeInTheDocument();
  });

  it('Test if the page contains an h2 header with the text About Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);

    const h2test = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(h2test).toBeInTheDocument();
  });

  it('Test if the page contains two paragraphs with text about the Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);

    const firstParagraph = getByText(/This application simulates a Pokédex/i);
    const secondParagraph = getByText(/One can filter Pokémons by type/i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Test if the page contains the following image of a Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');

    expect(img).toHaveAttribute('src', imgUrl);
    expect(img).toBeInTheDocument();
  });
});
