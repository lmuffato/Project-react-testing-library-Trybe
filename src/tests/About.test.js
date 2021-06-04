import React from 'react';
// import { getByRole } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa os elementos da componente About', () => {
  it('Teste se a página contém um heading h2 com o texto "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const textH2 = getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(textH2).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph01 = getByText(/This application simulates a Pokédex, a digital ency/);
    expect(paragraph01).toBeInTheDocument();
    const paragraph02 = getByText(/One can filter Pokémons by type, and see more detail/);
    expect(paragraph02).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma pokedex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const pokedexImg = getByRole('img');
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
