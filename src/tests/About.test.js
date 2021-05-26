import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('renderizar o componente Sobre', () => {
  it('deve renderizar o h2', () => {
    const { getByRole } = renderWithRouter(<About />);

    const h2 = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(h2).toBeInTheDocument();
  });

  it('deve renderizar dois parágrafos', () => {
    const { getByText } = renderWithRouter(<About />);

    const p1 = getByText(/This application simulates a Pokédex/);
    expect(p1).toBeInTheDocument();

    const p2 = getByText(/One can filter Pokémons by type/);
    expect(p2).toBeInTheDocument();
  });

  it('deve renderizar uma imagem', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const img = getByAltText('Pokédex');

    expect(img.src)
      .toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(img).toBeInTheDocument();
  });
});
