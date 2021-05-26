import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

describe('Requisito 2', () => {
  test('Testando se a página contém o texto `About Pokédex`', () => {
    const { getByText } = renderWithRouter(<About />);

    const headingAbout = getByText('About Pokédex');
    expect(headingAbout).toBeInTheDocument();
  });

  test('Testando se a página contém dois parágrafos', () => {
    const { getByText } = renderWithRouter(<About />);

    const textOne = 'This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons';
    const paragraphOne = getByText(textOne);
    expect(paragraphOne).toBeInTheDocument();

    const textTwo = 'One can filter Pokémons by type,'
    + ' and see more details for each one of them';
    const paragraphTwo = getByText(textTwo);
    expect(paragraphTwo).toBeInTheDocument();
  });

  test('Testando se a imagem renderiza na tela', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const imgText = getByAltText('Pokédex');
    expect(imgText).toBeInTheDocument();

    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    // expect(url).toBeInTheDocument();
    expect(imgText.src).toContain(url);
  });

  // test('', () => {});
});

// describe('Requisito 1', () => {
// });
