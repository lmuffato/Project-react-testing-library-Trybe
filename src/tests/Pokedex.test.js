import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const nextPokemon = 'next-pokemon';

test('teste se o heading contém o testo "Encountered pokémons"', () => {
  renderWithRouter(<App />);
  const heading = screen.getByRole('heading', { name: 'Encountered pokémons' });

  expect(heading).toBeInTheDocument();
});

test('Teste se é exibido o próximo Pokémon', () => {
  renderWithRouter(<App />);
  const btnProximo = screen.getByTestId(nextPokemon);

  expect(btnProximo.innerHTML).toMatch('Próximo pokémon');

  const numberClik = 8;
  const pokemonName = screen.getByTestId('pokemon-name');
  for (let index = 1; index <= numberClik; index += 1) {
    expect(pokemonName).toBeInTheDocument();
    userEvent.click(btnProximo);
  }

  const dragonair = screen.getByText('Dragonair');
  expect(dragonair).toBeInTheDocument();
  userEvent.click(btnProximo);

  const pikachu = screen.getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
});

test('Teste se é mostrado apenas um Pokémon por vez', () => {
  renderWithRouter(<App />);

  const pikachu = screen.getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();

  const btnProximo = screen.getByTestId(nextPokemon);

  userEvent.click(btnProximo);
  const charmander = screen.getByText('Charmander');
  expect(charmander).toBeInTheDocument();
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);
  const btnFire = screen
    .getByRole('button', { name: 'Fire' });
  const btnPsychic = screen
    .getByRole('button', { name: 'Psychic' });
  const btnProximo = screen.getByTestId(nextPokemon);

  userEvent.click(btnFire);
  const charmander = screen.getByText('Charmander');
  expect(charmander).toBeInTheDocument();

  userEvent.click(btnProximo);
  const rapidash = screen.getByText('Rapidash');
  expect(rapidash).toBeInTheDocument();

  userEvent.click(btnPsychic);
  const alakazam = screen.getByText('Alakazam');
  expect(alakazam).toBeInTheDocument();

  userEvent.click(btnProximo);
  const mew = screen.getByText('Mew');
  expect(mew).toBeInTheDocument();
});
test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App />);

  const btnAll = screen.getByRole('button', { name: 'All' });
  expect(btnAll).toBeInTheDocument();

  const btnFire = screen
    .getByRole('button', { name: 'Fire' });
  userEvent.click(btnFire);
  const charmander = screen.getByText('Charmander');
  expect(charmander).toBeInTheDocument();

  userEvent.click(btnAll);
  const pikachu = screen.getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();

  renderWithRouter(<App />);
  expect(pikachu).toBeInTheDocument();
});
test('Teste se é criado, dinamicamente, um botão de filtro', () => {
  renderWithRouter(<App />);

  const btnTypepokemon = screen.getAllByTestId('pokemon-type-button');
  const numberBtn = 7;
  expect(btnTypepokemon.length).toEqual(numberBtn);

  btnTypepokemon.forEach((btn) => {
    expect(btn).toBeInTheDocument();
  });
});

test('Testa se o botão All estar sempre visível', () => {
  renderWithRouter(<App />);
  const btnAll = screen.getByRole('button', { name: 'All' });
  expect(btnAll).toBeVisible();
});
test('Testa se o botão de Próximo pokémon deve ser desabilitado ', () => {
  renderWithRouter(<App />);
  const btnTypes = screen.getAllByTestId('pokemon-type-button');
  const btnNext = screen.getByTestId(nextPokemon);
  userEvent.click(btnTypes[0]);
  expect(btnNext.disabled).toBeTruthy();
  userEvent.click(btnTypes[2]);
  expect(btnNext.disabled).toBeTruthy();
  userEvent.click(btnTypes[3]);
  expect(btnNext.disabled).toBeTruthy();
  userEvent.click(btnTypes[5]);
  expect(btnNext.disabled).toBeTruthy();
  userEvent.click(btnTypes[6]);
  expect(btnNext.disabled).toBeTruthy();
});
// test('', () => {});
// test('', () => {});
