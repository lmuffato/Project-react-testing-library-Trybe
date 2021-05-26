import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Tests in About.js ', () => {
  it('Page contains informations of pokedex', () => {
    const lintFault1 = 'This application simulates a Pokédex, a digital encyclopedia';
    const lintFault2 = 'containing all Pokémons';
    const informationText1 = `${lintFault1} ${lintFault2}`;
    const lintFault3 = 'One can filter Pokémons by type, and see more details';
    const lintFault4 = 'for each one of them';
    const informationText2 = `${lintFault3} ${lintFault4}`;
    render(<About />);
    const pokedexInformation1 = screen.getByText(informationText1);
    const pokedexInformation2 = screen.getByText(informationText2);
    expect(pokedexInformation1 && pokedexInformation2).toBeInTheDocument();
  });
});
