import React from 'react';
import renderWithRouter from './renderWithHistory';
import About from '../components/About';

describe('testes do component About.js', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  it('Testa se página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);
    expect(getAllByText(/pokémons/i)).toHaveLength(2);
  });

  it('Testa se a página contém a imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    expect(getByAltText(/Pokédex/i).src)
      .toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
