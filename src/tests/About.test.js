import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Testes do componente About.', () => {
  it('Teste se a página contém um heading h2 com o texto `About Pokédex`', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se a página contém link de imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imagePokedex = getByRole('img');
    expect(imagePokedex).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
