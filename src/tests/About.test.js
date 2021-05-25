import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../components/About';

test('the page contains Pokedéx information', () => {
  const { getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const aboutPage = getByText(/About Pokédex/i);
  expect(aboutPage).toBeInTheDocument();
});

test('contains a h2 heading', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  const head = getByRole('heading', {
    name: /About Pokédex/,
    level: 2,
  });

  expect(head).toBeInTheDocument();
  expect(head).toHaveTextContent('About Pokédex');
});

test('contains two paragraphs', () => {
  const { getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  const paragraph1 = getByText(/This application simulates a Pokédex/i);
  const paragraph2 = getByText(/One can filter Pokémons by type/i);

  expect(paragraph1).toBeInTheDocument();
  expect(paragraph2).toBeInTheDocument();
});

test('contains a pokedéx img', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  const pokedexImg = getByRole('img', {
    name: /Pokédex/i,
  });
  expect(pokedexImg).toBeInTheDocument();
  expect(pokedexImg).toHaveAttribute('src',
    'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
