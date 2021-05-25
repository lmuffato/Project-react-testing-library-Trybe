import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';
import alias from './utils/alias';

describe('Testes para o componente "About.js"', () => {
  const { expectToBeInTheDocument } = alias;

  test('A página contém as informações sobre a Pokédex', () => {
    render(<About />);

    const whatIs = screen.getByText(/this application/i);
    const whatCanDo = screen.getByText(/can/i);

    expectToBeInTheDocument(whatIs, whatCanDo);
  });

  test('A página contém um heading "h2" com o texto "About Pokédex"', () => {
    render(<About />);

    expectToBeInTheDocument(
      screen.getByRole('heading', {
        name: 'About Pokédex',
        level: 2,
      }),
    );
  });

  test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    const paragraphs = screen.getAllByText(/ /i, { selector: 'p' });
    expect(paragraphs.length).toBe(2);
  });

  test(`A página contém a seguinte imagem de uma Pokédex:
  https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`, () => {
    render(<About />);

    const img = screen.getByRole('img', { name: 'Pokédex' });

    expectToBeInTheDocument(img);
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
