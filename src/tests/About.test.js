import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

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
});
