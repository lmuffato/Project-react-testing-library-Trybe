import React from 'react';

import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('renderizar o componente Sobre', () => {
  it('deve renderizar o h2', () => {
    const { getByRole } = renderWithRouter(<About />);

    const h2About = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(h2About).toBeInTheDocument();
  });

  it('deve renderizar dois parágrafos', () => {
    const { getByText } = renderWithRouter(<About />);

    const pAbout = getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');
    expect(pAbout).toBeInTheDocument();
    const pAbout2 = getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');
    expect(pAbout2).toBeInTheDocument();
  });
  it('deve renderizar uma imagem', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const image = getByAltText('Pokédex');

    expect(image.src)
      .toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toBeInTheDocument();
  });
});
