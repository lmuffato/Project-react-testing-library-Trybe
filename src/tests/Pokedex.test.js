import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
/* import Pokedex from '../components/Pokedex'; */
import App from '../App';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const tagH2 = getByRole('heading', {
    level: 2,
    name: /encountered pokémons/i,
  });
  expect(tagH2).toBeInTheDocument();
});

test('Testa se é exibido o próximo Pokémon quando o clica no botão', () => {
  const { getByRole, getByTestId } = renderWithRouter(<App />);
  const pokeButton = getByRole('button', { name: /próximo pokémon/i });
  userEvent.click(pokeButton);
  const idPoke = getByTestId('pokemon-name');
  expect(idPoke.innerHTML).toBe('Charmander');

  userEvent.click(pokeButton);
  userEvent.click(pokeButton);
  userEvent.click(pokeButton);
  userEvent.click(pokeButton);

  expect(idPoke.innerHTML).toBe('Mew');
});
