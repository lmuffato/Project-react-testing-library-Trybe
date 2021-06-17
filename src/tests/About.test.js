import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Teste se a página contém as informações sobre a Pokédex. ', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const linkToAbout = screen.getByRole('link', { name: /About/i });
  userEvent.click(linkToAbout);
  const h2About = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
  expect(h2About).toBeInTheDocument();
  const pokedexImg = screen.getByRole('img');
  expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
