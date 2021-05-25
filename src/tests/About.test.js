import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

describe('testing all screen application of the About', () => {
  it('check the title screen application', () => {
    const { getByRole } = renderWithRouter(<About />);
    const about = getByRole('heading', {
      name: /About Pokédex/i,
    });
    expect(about).toBeInTheDocument();
  });
  it('check image Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
