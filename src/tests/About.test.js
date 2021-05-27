import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('testing App components', () => {
  it('renders a reading with the text `about pokédex`', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('test if there are 2 paragraphs', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstP = getByText('This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons', {
    });
    expect(firstP).toBeInTheDocument();
    const secondP = getByText('One can filter Pokémons by type, '
    + 'and see more details for each one of them', {
    });
    expect(secondP).toBeInTheDocument();
  });

  // AltText foi uma sugestão de Bruno Bastos, turma 11.
  it('test if there is a pokedex img', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const pokedexImg = getByAltText(/pokédex/i, {

    });
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg.src)
      .toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
