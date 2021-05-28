import { render } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

describe('Testando se a página contém informaçoes sobre a pokedex', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = render(<About />);
    const h2 = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(h2).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByRole } = render(<About />);
    const p = getAllByRole('p');
    expect(p.length).toBe(2);
  });
  test('Teste se a página contém a img', () => {
    const { getByRole } = render(<About />);
    const img = getByRole('img');
    const srcImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(srcImg);
  });
});
