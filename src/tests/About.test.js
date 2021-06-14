import React from 'react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testa o component About', () => {
  it('Testa se a página tem um h2 com texto: About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const textTitle = getByText('About Pokédex');
    expect(textTitle).toBeInTheDocument();
  });
  it('Testa se a página tem 2 parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph1 = getByText(/This application simulates a Pokédex/i);
    const paragraph2 = getByText(/One can filter Pokémons by type/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
  it('Testa se a página tem o endereço da imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText('Pokédex');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

// Referências:
// Como acessar uma imagem e testar o seu src: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
// Como testar se há 2 parágrafos na página: https://github.com/tryber/sd-010-a-project-react-testing-library/pull/107/commits/3bc08bd2cbc943fb05955dedda6b4730f5231e18
