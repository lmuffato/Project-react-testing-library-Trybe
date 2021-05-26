import React from 'react';
import { About } from '../components';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

test('Testa se página contém um heading com o texto About Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);

  const heading = getByRole('heading', { name: /about pokédex/i });
  expect(heading).toBeInTheDocument();
});

test('Testa se página contém dois parágrafos', () => {
  const { getAllByRole } = renderWithRouter(<About />);

  const paragraphs = getAllByRole('paragraph');
  expect(paragraphs.length).toBe(2);
});

test('Testa se a página contém a imagem de uma Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);

  const img = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const image = getByRole('img');
  expect(image.src).toBe(img);
});
