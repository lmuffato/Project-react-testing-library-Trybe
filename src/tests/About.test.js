import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { About } from '../components';
import renderWithRouter from './RenderWithRouter.test';

test('Teste se a página About foi renderizada', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  userEvent.click(getByRole('link', { name: /about/i }));

  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Teste se a página contém h2 com o texto About Pokedex', () => {
  const { getByRole } = renderWithRouter(<About />);

  // userEvent.click(getByRole('link', { name: /about/i }));

  const headingAbout = getByRole('heading', { name: /about pokédex/i });
  expect(headingAbout).toBeInTheDocument();
});

test('Teste se a página contém 2 parágrafos', () => {
  const { getByText } = renderWithRouter(<About />);

  const paragraph1 = getByText('This application simulates a Pokédex, '
  + 'a digital encyclopedia containing all Pokémons');

  expect(paragraph1).toBeInTheDocument();

  const paragraph2 = getByText('One can filter Pokémons by type, '
  + 'and see more details for each one of them');

  expect(paragraph2).toBeInTheDocument();
});

test('Teste se a página contém uma imagem', () => {
  const { getByRole } = renderWithRouter(<About />);

  const img = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  const imgPokeAbout = getByRole('img');
  expect(imgPokeAbout.src).toBe(img);
});
