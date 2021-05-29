import React from 'react';
import { MemoryRouter as BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('Teste se a página contém as informações sobre a Pokédex', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <About />
    </BrowserRouter>,
  );

  const pokedexInfo = getByRole('heading', { level: 2 });
  expect(pokedexInfo).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByRole } = render(
    <BrowserRouter>
      <About />
    </BrowserRouter>,
  );

  const contain = getByRole('heading', { level: 2, name: 'About Pokédex' });
  expect(contain).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  const { getByText } = render(
    <BrowserRouter>
      <About />
    </BrowserRouter>,
  );

  const text1 = getByText('This application simulates a Pokédex, '
  + 'a digital encyclopedia containing all Pokémons');
  expect(text1).toBeInTheDocument();

  const text2 = getByText('One can filter Pokémons by type, '
  + 'and see more details for each one of them');
  expect(text2).toBeInTheDocument();
});

test('Teste se a página contém uma imagem de uma Pokédex', () => {
  render(
    <BrowserRouter>
      <About />
    </BrowserRouter>,
  );

  const img = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const imgPokeAbout = screen.getByRole('img');
  expect(imgPokeAbout.src).toBe(img);
});
