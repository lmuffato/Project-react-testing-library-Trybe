import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

describe('Testa se a página contém as informações sobre a Pokédex.', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = render(<About />);
    const headingPokedex = getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(headingPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = render(<About />);
    const p1 = getByText('This application simulates a Pokédex, '
        + 'a digital encyclopedia containing all Pokémons');
    expect(p1).toBeInTheDocument();
    const p2 = getByText('One can filter Pokémons by type, '
        + 'and see more details for each one of them');
    expect(p2).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = render(<About />);
    const imagem = getByRole('img');
    expect(imagem.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
