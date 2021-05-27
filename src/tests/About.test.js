import React from 'react';

import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';

import About from '../components/About';

test('tests return of application details', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <About />
    </MemoryRouter>,
  );
  const heading = getByText(/About Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('render image in "/About"', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={ ['/about'] }>
      <About />
    </MemoryRouter>,
  );
  const img = getByRole('img', { src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png' });
  expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
