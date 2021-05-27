import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const TESTE_ID = 'pokemon-type-button';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);

  const homeText = getByRole('heading', {
    name: /Encountered pokémons/i,
    level: 2,
  });

  expect(homeText).toBeInTheDocument();
});

test('Testa se ao clicar no botao proximo pokemon e mostrado Charmander', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);

  const myButton = getByRole('button', {
    name: /Próximo pokémon/i,
  });
  userEvent.click(myButton);

  const pokemonName = getByText('Charmander');

  expect(pokemonName).toBeInTheDocument();
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByRole } = renderWithRouter(<App />);

  const myButton = getByRole('button', {
    name: /All/i,
  });
  userEvent.click(myButton);
});

test('Teste se existe um botao com o data-testid next-pokemon', () => {
  const { getByTestId } = renderWithRouter(<App />);

  const myButton = getByTestId('next-pokemon');
  expect(myButton).toBeInTheDocument();
});

test('Teste se a Pokédex contém um botão com o texto Fire', () => {
  const { getByRole } = renderWithRouter(<App />);

  const myButton = getByRole('button', {
    name: /Fire/i,
  });
  userEvent.click(myButton);
  expect(myButton.dataset.testid).toBe(TESTE_ID);
});

test('Teste se a Pokédex contém um botão com o texto Psychic', () => {
  const { getByRole } = renderWithRouter(<App />);

  const myButton = getByRole('button', {
    name: /Psychic/i,
  });
  userEvent.click(myButton);
  expect(myButton.dataset.testid).toBe(TESTE_ID);
});

test('Teste se a Pokédex contém um botão com o texto Electric', () => {
  const { getByRole } = renderWithRouter(<App />);

  const myButton = getByRole('button', {
    name: /Electric/i,
  });
  userEvent.click(myButton);
  expect(myButton.dataset.testid).toBe(TESTE_ID);
});

test('Teste se a Pokédex contém um botão com o texto Bug', () => {
  const { getByRole } = renderWithRouter(<App />);

  const myButton = getByRole('button', {
    name: /Bug/i,
  });
  userEvent.click(myButton);
  expect(myButton.dataset.testid).toBe(TESTE_ID);
});

test('Teste se a Pokédex contém um botão com o texto Poison', () => {
  const { getByRole } = renderWithRouter(<App />);

  const myButton = getByRole('button', {
    name: /Poison/i,
  });
  userEvent.click(myButton);
  expect(myButton.dataset.testid).toBe(TESTE_ID);
});

test('Teste se a Pokédex contém um botão com o texto Dragon', () => {
  const { getByRole } = renderWithRouter(<App />);

  const myButton = getByRole('button', {
    name: /Dragon/i,
  });
  userEvent.click(myButton);
  expect(myButton.dataset.testid).toBe(TESTE_ID);
});

test('Teste se a Pokédex contém um botão com o texto Normal', () => {
  const { getByRole } = renderWithRouter(<App />);

  const myButton = getByRole('button', {
    name: /Normal/i,
  });
  userEvent.click(myButton);
  expect(myButton.dataset.testid).toBe(TESTE_ID);
});
