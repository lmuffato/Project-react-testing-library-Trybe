import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

// Este requisito foi desenvolvido com base na solução do estudante Adelino Jr. //

it(' Teste o componente <Pokedex.js />', () => {
  const { getByRole, getByAltText } = renderWithRouter(<App />);

  const title = getByRole('heading', { name: /Encountered pokémons/i });

  const nextPokemon = getByRole('button', { name: /Próximo pokémon/i });

  userEvent.click(nextPokemon);

  const altImage = getByAltText('Charmander sprite');

  expect(title).toBeInTheDocument();
  expect(altImage.src).toContain('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
});

it(' Teste o componente <Pokedex.js />', () => {
  const { getByRole } = renderWithRouter(<App />);

  const buttonAll = getByRole('button', { name: /all/i });

  userEvent.click(buttonAll);

  expect(buttonAll).toBeInTheDocument();
});

it('Teste se a Pokédex tem os botões de filtro', () => {
  const { getByRole } = renderWithRouter(<App />);

  const EletricButton = getByRole('button', { name: /Electric/i });

  const nextButton = getByRole('button', { name: /Próximo pokémon/i });

  userEvent.click(EletricButton);

  expect(nextButton).toBeDisabled();
});

it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getAllByTestId } = renderWithRouter(<App />);

  const tipos = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  const dataTest = 'pokemon-type-button';
  const buttons = [...getAllByTestId(dataTest)];
  const arrayTypeButtons = buttons.map((btn) => btn.innerHTML);

  expect(arrayTypeButtons).toEqual(tipos);
});
