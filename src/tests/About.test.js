import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByText, getByRole } = render(<About />);
  expect(getByRole('heading')).toBeInTheDocument();
  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  const { getByText } = render(<About />);
  const firstParagraph = getByText('This application simulates a Pokédex, a '
  + 'digital encyclopedia containing all Pokémons');
  expect(firstParagraph).toBeInTheDocument();

  const secondParagraph = getByText('One can filter Pokémons by type, '
  + 'and see more details for each one of them');
  expect(secondParagraph).toBeInTheDocument();
});

test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  const { getByRole, getByAltText } = render(<About />);
  const imagem = getByAltText('Pokédex');
  expect(imagem).toBeInTheDocument();

  const imgSrc = getByRole('img');
  expect(imgSrc.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
