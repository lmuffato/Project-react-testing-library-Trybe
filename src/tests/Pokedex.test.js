import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('Teste se página mostra os pokemons corretamente', () => {
  const { getByRole, getByAltText } = renderWithRouter(<App />);

  const title = getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });

  const buttonAll = getByRole('button', {
    name: /all/i,
  });

  const nextPokemon = getByRole('button', {
    name: /Próximo pokémon/i,
  });

  userEvent.click(buttonAll);
  userEvent.click(nextPokemon);

  const altImage = getByAltText('Charmander sprite');

  expect(title).toBeInTheDocument();
  expect(altImage.src).toContain('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
});

test(`Testa si ao filtar um pokemon de unico tipo, o "button" 
  Proximo pokemon fica disabilitado`, () => {
  const { getByRole } = renderWithRouter(<App />);

  const buttonPoison = getByRole('button', {
    name: /poison/i,
  });

  const nextPokemon = getByRole('button', {
    name: /Próximo pokémon/i,
  });

  userEvent.click(buttonPoison);

  expect(nextPokemon).toBeDisabled();
});

test('Testa si aparece os "buttons para filtarem de pokemons"', () => {
  const { getAllByTestId } = renderWithRouter(<App />);

  const allTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  const dataTestid = 'pokemon-type-button';
  const buttons = [...getAllByTestId(dataTestid)];
  const arrayTypeButtons = buttons.map((btn) => btn.innerHTML);

  expect(arrayTypeButtons).toEqual(allTypes);
});
