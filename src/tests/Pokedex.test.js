import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const nameId = 'pokemon-name';

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
  const idPoke = getByTestId(nameId);
  expect(idPoke.innerHTML).toBe('Charmander');

  userEvent.click(pokeButton);
  userEvent.click(pokeButton);
  userEvent.click(pokeButton);
  userEvent.click(pokeButton);

  expect(idPoke.innerHTML).toBe('Mew');
});

test('O primeiro Pokémon deve ser mostrado ao click, se estiver no último', () => {
  const { getByRole, getByTestId } = renderWithRouter(<App />);
  const pokeButton = getByRole('button', { name: /próximo pokémon/i });
  const idPoke = getByTestId('pokemon-name');

  expect(idPoke.innerHTML).toBe('Pikachu');
  userEvent.click(pokeButton);
  userEvent.click(pokeButton);
  userEvent.click(pokeButton);
  userEvent.click(pokeButton);
  userEvent.click(pokeButton);
  userEvent.click(pokeButton);
  userEvent.click(pokeButton);
  userEvent.click(pokeButton);
  expect(idPoke.innerHTML).toBe('Dragonair');
  userEvent.click(pokeButton);
  expect(idPoke.innerHTML).toBe('Pikachu');
});

test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  const { getAllByTestId, getByRole } = renderWithRouter(<App />);
  const idPoke = getAllByTestId(nameId);
  const pokeButton = getByRole('button', { name: /próximo pokémon/i });
  expect(idPoke.length).toBe(1);
  userEvent.click(pokeButton);
  expect(idPoke.length).toBe(1);
});

test('Teste se a Pokédex tem os botões de filtro.', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const buttons = getAllByTestId('pokemon-type-button');
  const lengthButton = 7;

  expect(buttons.length).toBe(lengthButton);
});
