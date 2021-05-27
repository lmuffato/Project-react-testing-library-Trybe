import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { About } from '../components';

test('Teste se a página contém as informações sobre a Pokédex.', () => {
  const { getByRole, getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  const h2 = getByRole('heading', { name: /About Pokédex/i, level: 2 });
  expect(h2).toBeInTheDocument();

  const p = getByText(/This application simulates a Pokédex, a/i);
  expect(p).toBeInTheDocument();

  const p2 = getByText(/One can filter Pokémons by type, and/i);
  expect(p2).toBeInTheDocument();

  const img = getByRole('img', { name: /Pokédex/i });
  expect(img).toBeInTheDocument();
  expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
