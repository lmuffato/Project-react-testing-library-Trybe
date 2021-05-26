import React from 'react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import { Pokedex } from '../components';
import pokemons from '../data';

const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

test('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('Teste se exibido o próximo Pokémon da lista', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App>
        <Pokedex pokemons={ pokemons } />
      </App>
    </MemoryRouter>,
  );

  const button = getByTestId('next-pokemon');
  expect(button).toHaveTextContent('Próximo pokémon');
  userEvent.click(button);
  const pokemon = getByText('Charmander');
  expect(pokemon).toBeInTheDocument();
  userEvent.click(button);
  expect(pokemon).not.toHaveTextContent('Charmander');
});

test('Teste se Pokédex tem os botões de filtro.', () => {
  const { getByText, getAllByTestId, getByTestId } = render(
    <MemoryRouter>
      <App>
        <Pokedex pokemons={ pokemons } />
      </App>
    </MemoryRouter>,
  );

  const buttons = getAllByTestId('pokemon-type-button');
  expect(buttons[0]).toHaveTextContent('Electric');
  userEvent.click(buttons[0]);
  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent('Pikachu');
  userEvent.click(buttons[1]);
  expect(pokemonName).toHaveTextContent('Charmander');
  const resetButton = getByText('All');
  userEvent.click(resetButton);
  expect(pokemonName).toHaveTextContent('Pikachu');
});

test('Teste se é criado, dinamicamente, um botão de filtro.', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App>
        <Pokedex pokemons={ pokemons } />
      </App>
    </MemoryRouter>,
  );

  const buttons = getAllByTestId('pokemon-type-button');
  buttons.forEach((element, index) => {
    expect(element).toHaveTextContent(types[index]);
  });
});
