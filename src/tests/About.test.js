import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

test('Teste se a página contém as informações sobre a Pokédex.', () => {
  const { getByText } = renderWithRouter(<About />);
  const aboutTextInfo = getByText(/This application simulates/i);
  expect(aboutTextInfo).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const testh2Info = getByRole('heading', {
    name: /about pokédex/i,
    level: 2,
  });
  expect(testh2Info).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos', () => {
  const { getAllByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const pAboutPoke = getAllByText(/pokémons/i);
  expect(pAboutPoke.length).toBe(2);
});

test('Teste se a página contém', () => {
  const { getByRole } = renderWithRouter(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const tagImg = getByRole('img');
  const linkImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(tagImg).toBeInTheDocument();
  expect(tagImg.src).toBe(linkImg);
});
