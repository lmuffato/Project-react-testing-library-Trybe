import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

test('Teste se a página contém as informações sobre a Pokédex.', () => {
  const { getByRole, getByAltText } = renderWithRouter(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  const title = getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });

  const altImage = getByAltText('Pokédex');

  expect(title).toBeDefined();
  expect(altImage.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
