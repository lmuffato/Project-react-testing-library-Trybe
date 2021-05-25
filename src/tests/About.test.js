import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('renders the about page', () => {
  it('verify if the about page contains information about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraf = getByText(/This application simulates a Pokédex/i);
    const secondParagraf = getByText(/One can filter Pokémons by type/i);

    expect(firstParagraf).toBeInTheDocument();
    expect(secondParagraf).toBeInTheDocument();
  });

  it('verify if the page contains a heading "h2" with the text "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { level: 2 });

    expect(heading.textContent).toBe('About Pokédex');
  });

  it('verify if the page contains 2 paragrafs with text about the Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const paragrafs = getAllByText(/Pokémons/);

    expect(paragrafs.length).toBe(2);
  });

  it(`verify if the page contains the following image of a Pokédex:
    "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"`,
  () => {
    const { getByRole } = renderWithRouter(<About />);
    const source = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');
    // console.log(img.src);
    expect(img.src).toBe(source);
  });
});
