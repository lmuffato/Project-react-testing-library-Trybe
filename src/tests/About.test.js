import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Requirement 02 - Testing About', () => {
  it('should show information about pokedex', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutInfo = getByText(/This application simulates a Pokédex/);
    expect(aboutInfo).toBeInTheDocument();
  });
  it('the About page should be rendered', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('About Pokédex');
  });
  it('should contain an image of pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
