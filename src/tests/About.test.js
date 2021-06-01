import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Teste referente a página About', () => {
  it('Testa se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    const heading = getByText(/about pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('Testa se a página contém um tag H2 com o texto "About Pokédex"', () => {
    const { getByRole } = render(<About />);
    const paragrafoH2 = getByRole('heading', {
      level: 2, name: /about pokédex/i,
    });
    expect(paragrafoH2).toBeInTheDocument();
  });
  it('Verifica se existem dois parágrafos na tela.', () => {
    const { getByText } = render(<About />);
    const primeiroParagrafo = getByText(/This application simulates a Pokédex/i);
    const segundoParagrafo = getByText(/One can filter Pokémons by type/i);
    expect(primeiroParagrafo).toBeInTheDocument();
    expect(segundoParagrafo).toBeInTheDocument();
  });
  it('Teste a existência de uma imagem específica na tela.', () => {
    const { getByAltText } = render(<About />);
    const imagem = getByAltText(/pokédex/i);
    expect(imagem).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
