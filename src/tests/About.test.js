import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { About } from '../components';

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  const image = getByRole('img');
  expect(image).toHaveAttribute('src',
    expect.stringMatching('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'));
});
