import React from 'react';
import { render, screen } from '@testing-library/react';
// import RenderWithRouter from './RenderWithRouter';
import About from '../components/About';

describe('test about', () => {
  test('informações sobre a Pokédex'
  + 'heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const titulo = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });

    expect(titulo).toBeInTheDocument();
  });

  test('contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const p = document.querySelectorAll('p');
    console.log(p);
    expect(p).toHaveLength(2);
  });

  test('imagem de uma Pokédex', () => {
    render(<About />);
    const image = screen.getByAltText('Pokédex');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    // usei o exemplo dessa resposta no stack overflow https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
  });
});
