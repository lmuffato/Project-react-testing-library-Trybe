import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('Teste o componente <Pokemon.js />', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const pokeName = screen.getByTestId('pokemon-name');
  expect(pokeName.innerHTML).toBe('Pikachu');
  const pokeWeight = screen.getByTestId('pokemon-weight');
  expect(pokeWeight.innerHTML).toBe('Average weight: 6.0 kg');
  const pokeType = screen.getByTestId('pokemon-type');
  expect(pokeType.innerHTML).toBe('Electric');
  const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
  userEvent.click(moreDetailsLink);
  const moreDetailsSum = screen.getByRole('heading', { name: /Summary/i, level: 2 });
  expect(moreDetailsSum).toBeInTheDocument();
  const pokeImg = screen.getByRole('img', { name: /Pikachu sprite/i });
  expect(pokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  const favCheckbox = screen.getByRole('checkbox');
  userEvent.click(favCheckbox);
  const favStar = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
  expect(favStar.src).toBe('http://localhost/star-icon.svg');
  expect(favStar).toBeInTheDocument();
});
