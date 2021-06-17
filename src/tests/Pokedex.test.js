import React from 'react';
import { Router, MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

const pokemonNameTestId = 'pokemon-name';

test('Teste se página contém um h2 com o texto Page requested not found. ', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const h2Encount = screen
    .getByRole('heading', { name: /Encountered Pokémons/i, level: 2 });
  expect(h2Encount).toBeInTheDocument();
  const buttonEncount = screen
    .getByRole('button', { name: /Próximo pokémon/i });
  expect(buttonEncount).toBeInTheDocument();
  userEvent.click(buttonEncount);
  const nextPokemon = screen.getByTestId(pokemonNameTestId);
  expect(nextPokemon.innerHTML).toBe('Charmander');
  userEvent.click(buttonEncount);
  expect(nextPokemon.innerHTML).toBe('Caterpie');
  userEvent.click(buttonEncount);
  expect(nextPokemon.innerHTML).toBe('Ekans');
  userEvent.click(buttonEncount);
  expect(nextPokemon.innerHTML).toBe('Alakazam');
  userEvent.click(buttonEncount);
  expect(nextPokemon.innerHTML).toBe('Mew');
  userEvent.click(buttonEncount);
  expect(nextPokemon.innerHTML).toBe('Rapidash');
  userEvent.click(buttonEncount);
  expect(nextPokemon.innerHTML).toBe('Snorlax');
  userEvent.click(buttonEncount);
  expect(nextPokemon.innerHTML).toBe('Dragonair');
  userEvent.click(buttonEncount);
  expect(nextPokemon.innerHTML).toBe('Pikachu');
  const pokemonList = screen.getAllByTestId(pokemonNameTestId);
  expect(pokemonList.length).toBe(1);
});

test('Pokédex tem os botões de filtro', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const filterButton = screen.getByRole('button', {
    name: 'Fire',
  });
  const filterId = screen.getAllByTestId('pokemon-type-button');
  expect(filterId[1].innerHTML).toBe('Fire');
  userEvent.click(filterButton);
  let pokemon = screen.getByTestId(pokemonNameTestId).innerHTML;
  expect(pokemon).toBe('Charmander');
  const nextButton = screen.getByRole('button', {
    name: 'Próximo pokémon',
  });
  userEvent.click(nextButton);
  pokemon = screen.getByTestId(pokemonNameTestId).innerHTML;
  expect(pokemon).toBe('Rapidash');
  const allButton = screen.getByRole('button', {
    name: 'All',
  });
  userEvent.click(allButton);
  pokemon = screen.getByTestId(pokemonNameTestId).innerHTML;
  expect(pokemon).toBe('Pikachu');
});
