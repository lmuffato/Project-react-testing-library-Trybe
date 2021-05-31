import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../components/renderWithRouter';

describe('2. Teste o componente <About.js /.', () => {
  it('Testa se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const pokeInfo = getByText(/This application simulates a Pokédex/i);

    expect(pokeInfo).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = render(
      <About />,
    );
    const h2Test = getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });

    expect(h2Test).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = render(
      <About />,
    );
    const p1 = getByText(/This application simulates a Pokédex/i);
    const p2 = getByText(/One can filter Pokémons by type/i);

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem de uma Pokédex', () => {
    const { getByRole } = render(
      <About />,
    );
    const img = getByRole('img');
    const imgSource = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', imgSource);
  });
});
