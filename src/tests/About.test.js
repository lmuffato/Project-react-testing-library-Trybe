import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente "About"', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    const pokedex = getByText(/About Pokédex/i);

    expect(pokedex).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = render(<About />);
    const about = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(about).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByText } = render(<About />);
    const paragraphs = getAllByText(/Pokémons/i);

    expect(paragraphs.length).toBe(2);
  });

  it(`Teste se a página contém a seguinte imagem de uma Pokédex: 
    https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`, () => {
    const { getByRole } = render(<About />);
    const imagePokedex = getByRole('img');

    expect(imagePokedex).toBeInTheDocument();
    expect(imagePokedex.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    // Consegui entender que usando o .src eu acesso essa propriedade do objecto pego.
    // Fonte: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
  });
});
