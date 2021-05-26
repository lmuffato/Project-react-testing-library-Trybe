import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Reaquirement 2 - testing the <About/> component', () => {
  it('Check if the title contains tehe text "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    expect(getByRole('heading', { name: 'About Pokédex' })).toBeInTheDocument();
  });

  it('Check that the image source is "`https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"', () => {
    const { getByAltText } = renderWithRouter(<About />);
    expect(getByAltText('Pokédex').src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
