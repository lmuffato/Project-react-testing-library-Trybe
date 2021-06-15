import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './RenderWithRouter';

describe('bloco de testes de about', () => {
  test('teste se a pagina About contem h2', () => {
    renderWithRouter(<About />);

    const testH2 = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(testH2).toBeInTheDocument();
  });

  test('testando renderização de imgagem', () => {
    renderWithRouter(<About />);

    const imagem = screen.getByRole('img');
    const srcImagem = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    // trecho do código realizado com ajuda de Eduardo Costa
    expect(imagem.src).toBe(srcImagem);
  });
});
