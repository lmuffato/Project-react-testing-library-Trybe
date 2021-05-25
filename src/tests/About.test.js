import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa todo o Componente "About"', () => {
  test('Verifica se a página contém as informações sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('about');
    const informations = screen.getByText(/This application simulates a.../i);
    expect(informations).toBeInTheDocument();
  });

  test('Verifica se a página contém um heading h2 com o texto "About Pokédex"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('about');
    const heading = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });

  test('Verifica se a página contém dois parágrafos com texto "sobre a Pokédex"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('about');
    const paragraphOne = screen.getByText(/This application.../i);
    const paragraphTwo = screen.getByText(/One can filter P.../i);
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  test('Verifica se a página contém a seguinte imagem de uma Pokédex: "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png".', () => {
    const { history } = renderWithRouter(<App />);
    history.push('about');
    const image = screen.getByRole('img');
    const imageSource = image.getAttribute('src');// consultado o get atribute em: https://stackoverflow.com/questions/19252339/get-element-by-src-attribute-with-javascript-not-jquery
    expect(imageSource).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
