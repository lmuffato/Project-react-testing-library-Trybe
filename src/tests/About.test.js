import React from 'react';
import { About } from '../components';
import renderWithRouter from '../components/helper';

// Refatorar este Teste, não esquecer!!

describe('Testa a tela de about', () => {
  it('As informações sobre a pokedex são exibidas', () => {
    const { getByRole } = renderWithRouter(<About />);
    const subtitle = getByRole('heading', { level: 2, name: 'About Pokédex' });
    const image = getByRole('img');
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(subtitle).toBeInTheDocument();
    expect(image.src).toBe(imgURL);
  });
});
