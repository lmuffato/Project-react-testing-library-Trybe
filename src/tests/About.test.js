import React from 'react';
import { About } from '../components';
import renderWithRouter from './RenderWithRouter';

describe('Teste do componente About', () => {
  it('Testa se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = getByText(/This application simulates a Pokédex/i);
    expect(firstParagraph).toBeInTheDocument();
    const secondParagraph = getByText(/One can filter Pokémons by type/i);
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Teste se a página contém determinada imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    expect(getByRole('img').src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
