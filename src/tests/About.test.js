import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

it('contains info about pokédex', () => {
  render(<About />);

  const info = screen.getByText(/can filter Pokémons by type, and see more details/i);
  expect(info).toBeInTheDocument();
});

it('contains h2 with text About pokédex', () => {
  const { getByRole } = render(<About />);

  const h2 = getByRole('heading', {
    name: 'About Pokédex',
    level: 2,
  });

  expect(h2).toBeInTheDocument();
});

it('contains a pokédex img', () => {
  const { getByAltText } = render(<About />);

  const img = getByAltText('Pokédex');
  const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/'
  + 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  expect(img.src).toContain(url);
});
