import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

test('renders About Pokedex with heading, 2 paragraphs and a image', () => {
  const { getByRole, getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const heading = getByRole('heading', { name: 'About Pokédex' });
  const paragraph1 = getByText(/This application simulates a Pokédex/i);
  const paragraph2 = getByText(/One can filter Pokémons/i);
  const img = getByRole('img', { name: 'Pokédex' });

  expect(heading).toBeInTheDocument();
  expect(paragraph1).toBeInTheDocument();
  expect(paragraph2).toBeInTheDocument();
  expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
