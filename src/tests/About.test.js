import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import { About } from '../components';

describe('Testa o componente <About.js /.', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const paragrafoUm = screen.getByText('This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons');

    expect(paragrafoUm).toBeInTheDocument();

    const paragrafoDois = screen.getByText('One can filter Pokémons by type, '
    + 'and see more details for each one of them');

    expect(paragrafoDois).toBeInTheDocument();
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const linkAbout = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(linkAbout).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    // const elementosP = screen.getAllByRole('p');
    // expect(elementosP.length).toBe(2);

    const paragrafoUm = screen.getByText('This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons');

    expect(paragrafoUm).toBeInTheDocument();

    const paragrafoDois = screen.getByText('One can filter Pokémons by type, '
    + 'and see more details for each one of them');

    expect(paragrafoDois).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img');
    const srcImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img.src).toBe(srcImg);
  });
});
