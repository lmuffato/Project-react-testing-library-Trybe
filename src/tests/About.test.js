import React from 'react';
import renderWithRouter from '../RenderWithRouter';
import { About } from '../components';

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const heading = getByText(/About Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const image = getByRole('img');
  expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
