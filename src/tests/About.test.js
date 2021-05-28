import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('test component About', () => {
  it('heading h2 have Text About Pokedéx', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('have especific image link on src', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imagePokedex = getByRole('img');
    expect(imagePokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
