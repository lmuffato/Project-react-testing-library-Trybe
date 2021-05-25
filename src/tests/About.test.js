import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste do componente About.js', () => {
  it('A página contém informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });

  it('A página contém uma imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imgPokedex = screen.getByRole('img');

    expect(imgPokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
