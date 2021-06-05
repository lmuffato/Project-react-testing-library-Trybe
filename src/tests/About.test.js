// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import RenderWithRouter from './RenderWithRouter';

describe('Testa se o componente <About.js />  é renderizado', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    RenderWithRouter(<About />);
    const information = screen.getByText(/This application simulates a Pokédex/);
    expect(information).toBeInTheDocument();
  });
});

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  RenderWithRouter(<About />);
  const heading = screen.getByRole('heading', {
    name: 'About Pokédex',
    level: 2,
  });
  expect(heading).toBeInTheDocument();
});

// Referencia para resolucao dos testes a seguir: https://github.com/tryber/sd-010-a-project-react-testing-library/pull/27/files
test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  RenderWithRouter(<About />);
  const paragrafos = screen.getAllByText(/pokémon/i);
  expect(paragrafos.length).toBe(2);
});

test('Teste se a página contém a imagem correta de uma Pokédex:', () => {
  RenderWithRouter(<About />);
  const imagem = screen.getByRole('img');
  expect(imagem).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  expect(imagem).toHaveAttribute('alt', 'Pokédex');
});
