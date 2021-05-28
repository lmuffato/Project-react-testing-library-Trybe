import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const nameId = 'pokemon-name';
const pokeButton = () => {
  const { getByRole } = renderWithRouter();
  return getByRole('button', {
    name: /próximo pokémon/i,
  });
};

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const tagH2 = getByRole('heading', {
    level: 2,
    name: /encountered pokémons/i,
  });
  expect(tagH2).toBeInTheDocument();
});

test('Testa se é exibido o próximo Pokémon quando o clica no botão', () => {
  const { getByTestId } = renderWithRouter(<App />);
  userEvent.click(pokeButton());
  const idPoke = getByTestId(nameId);
  expect(idPoke.innerHTML).toBe('Charmander');

  userEvent.click(pokeButton());
  userEvent.click(pokeButton());
  userEvent.click(pokeButton());
  userEvent.click(pokeButton());

  expect(idPoke.innerHTML).toBe('Mew');
});

test('O primeiro Pokémon deve ser mostrado ao click, se estiver no último', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const idPoke = getByTestId('pokemon-name');

  expect(idPoke.innerHTML).toBe('Pikachu');
  userEvent.click(pokeButton());
  userEvent.click(pokeButton());
  userEvent.click(pokeButton());
  userEvent.click(pokeButton());
  userEvent.click(pokeButton());
  userEvent.click(pokeButton());
  userEvent.click(pokeButton());
  userEvent.click(pokeButton());
  expect(idPoke.innerHTML).toBe('Dragonair');
  userEvent.click(pokeButton());
  expect(idPoke.innerHTML).toBe('Pikachu');
});

test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const idPoke = getAllByTestId(nameId);
  expect(idPoke.length).toBe(1);
  userEvent.click(pokeButton());
  expect(idPoke.length).toBe(1);
});

/* Esses codigos abaixo foram feitos com abstração do codigo do colega Sergio Martins T-10 */
/* eu derreti minha cabeça e meu computador mas compriendi tudo. */

test('Teste se a Pokédex tem os botões de filtro.', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const buttons = getAllByTestId('pokemon-type-button');
  const lengthButton = 6;
  const butTypes = ['Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal'];
  const funcMap = buttons.map(({ innerHTML }) => innerHTML);

  expect(buttons.length).toBeGreaterThanOrEqual(lengthButton);
  expect(funcMap.sort()).toEqual(butTypes.sort());
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByRole, getByTestId } = renderWithRouter(<App />);
  const buttonAll = getByRole('button', { name: /all/i });
  const buttonPsychic = getByRole('button', { name: /psychic/i });
  const pokemon = getByTestId('pokemon-type');
  expect(buttonAll).toBeInTheDocument();
  userEvent.click(buttonPsychic);
  expect(pokemon.innerHTML).toBe('Psychic');
  userEvent.click(buttonAll);
  expect(pokemon.innerHTML).toBe('Electric');
});

test('O botão de Próximo pokémon deve ser desabilitado', () => {
  const { getByRole } = renderWithRouter(
    <App />,
  );
  const buttonAll = getByRole('button', { name: /all/i });
  const buttonNormal = getByRole('button', { name: /normal/i });

  userEvent.click(buttonNormal);
  expect(pokeButton()).toBeDisabled();

  userEvent.click(buttonAll);
  expect(pokeButton()).not.toBeDisabled();
});
