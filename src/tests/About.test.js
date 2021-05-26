import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

// Referência para resolução do teste da imagem: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f;
// Referência para a resolução do teste de 2 parágrafos: https://github.com/tryber/sd-010-a-project-react-testing-library/pull/68/files;

describe('Testa o componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const textPokedex = screen.getByText(/This application simulates a Pokédex/);
    expect(textPokedex).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(aboutPokedex).toBeInTheDocument();
  });
  test('', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toHaveAttribute('alt', 'Pokédex');
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const paragraphs = screen.getAllByText(/pokémon/i);
    expect(paragraphs.length).toBe(2);
  });
});
