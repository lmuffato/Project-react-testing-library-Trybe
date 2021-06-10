import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('Testando se a página contém as informações sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const textPokedex = getByText('About Pokédex');
  expect(textPokedex).toBeInTheDocument();
});

test('Testando se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const headingH2 = getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });
  expect(headingH2).toBeInTheDocument();
});

test('Testando se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const one1 = 'This application simulates a Pokédex,';
  const one2 = 'a digital encyclopedia containing all Pokémons';
  const paragOne = getByText(`${one1} ${one2}`);

  const two1 = 'One can filter Pokémons by type,';
  const two2 = 'and see more details for each one of them';
  const paragTwo = getByText(`${two1} ${two2}`);

  expect(paragOne).toBeInTheDocument();

  expect(paragTwo).toBeInTheDocument();
});

test('Testando se a página contém a seguinte imagem de uma Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const getImage = getByRole('img');
  expect(getImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
