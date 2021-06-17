import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('tests for the About component', () => {
  it('Tests whether the page contains information about Pokédex', () => {
    render(<About />);
    const heading = screen.getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('Test if the page contains two paragraphs with text about Pokédex', () => {
    render(<About />);
    const p1 = screen.getByText('This application simulates a Pokédex, '
      + 'a digital encyclopedia containing all Pokémons');
    expect(p1).toBeInTheDocument();
    const p2 = screen.getByText('One can filter Pokémons by type, '
      + 'and see more details for each one of them');
    expect(p2).toBeInTheDocument();
  });

  it('test if it contains an image', () => {
    render(<About />);
    const image = screen.getByRole('img');
    const imageAdress = image.src;
    const adress = 'https://cdn2.bulbagarden.net/upload'
    + '/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(imageAdress).toEqual(adress);
  });
});
