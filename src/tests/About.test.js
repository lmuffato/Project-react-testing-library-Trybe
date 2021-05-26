import React from 'react';
import { About } from '../components';
import renderWithRouter from './RenderWithRouter';

describe('este se a página contém as informações sobre a Pokédex.', () => {
  test('Teste se a página contém um heading "h2" com o texto "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const headingH2 = getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph1 = getByText(/This application simulates a Pokédex/i);
    const paragraph2 = getByText(/One can filter Pokémons by type,/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imageSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImage = getByRole('img', {
      nome: 'Pokédex',
    });
    expect(pokedexImage.src).toBe(imageSrc);
  });
});
