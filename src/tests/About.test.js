import React from 'react';
import { render, screen } from '@testing-library/react';
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
  it('Page contain a heading with text About Pokedex', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.innerHTML).toBe('About Pokédex');
  });
  it('Page contains two p tags', () => {
    const lintFault1 = 'This application simulates a Pokédex, a digital encyclopedia';
    const lintFault2 = 'containing all Pokémons';
    const informationText1 = `${lintFault1} ${lintFault2}`;
    const lintFault3 = 'One can filter Pokémons by type, and see more details';
    const lintFault4 = 'for each one of them';
    const informationText2 = `${lintFault3} ${lintFault4}`;
    render(<About />);
    const pokedexInformation1 = screen.getByText(informationText1);
    const pokedexInformation2 = screen.getByText(informationText2);
    expect(pokedexInformation1.outerHTML).toBe(`<p>${informationText1}</p>`);
    expect(pokedexInformation2.outerHTML).toBe(`<p>${informationText2}</p>`);
  });
  it('Pokedex img', () => {
    render(<About />);
    const imgPath = screen.getByRole('img');
    expect(imgPath.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
