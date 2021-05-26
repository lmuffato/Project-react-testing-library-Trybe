import React from 'react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

test('Testa se página contém um heading com o texto About Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const heading = getByRole('heading', { name: /about pokédex/i });
  expect(heading).toBeInTheDocument();
});

test('Testa se página contém dois parágrafos', () => {
  const { getByText } = renderWithRouter(<About />);
  const p1 = getByText('This application simulates a Pokédex, '
  + 'a digital encyclopedia containing all Pokémons');
  expect(p1).toBeInTheDocument();
  const p2 = getByText('One can filter Pokémons by type, '
  + 'and see more details for each one of them');
  expect(p2).toBeInTheDocument();
});

test('Testa se a página contém a imagem de uma Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const img = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const image = getByRole('img');
  expect(image.src).toBe(img);
});
