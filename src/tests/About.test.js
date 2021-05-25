import React from 'react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Requisito 2 - Teste o componente <About.js /',
  () => {
    it('Teste se a página contém um heading h2 com o texto About Pokédex',
      () => {
        const { getByText } = renderWithRouter(<About />);
        const heading = getByText(/about pokédex/i);
        expect(heading).toBeInTheDocument();
      });
    it('Teste se a página contém dois parágrafos com texto sobre a Pokédex',
      () => {
        const { getByText } = renderWithRouter(<About />);
        const p1 = getByText('This application simulates a Pokédex, '
          .concat('a digital encyclopedia containing all Pokémons'));
        const p2 = getByText('One can filter Pokémons by type, '
          .concat('and see more details for each one of them'));
        expect(p1).toBeInTheDocument();
        expect(p2).toBeInTheDocument();
      });
    it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
      () => {
        const { getByRole } = renderWithRouter(<About />);
        const image = getByRole('img');
        const expectedPath = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
        expect(image.src).toBe(expectedPath);
      });
  });
