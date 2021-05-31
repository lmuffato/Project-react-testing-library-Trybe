import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';
import pokemons from '../data';

test('Teste se página contém um heading h2 com o texto', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
});

test('Teste se é exibido o próximo Pokémon da lista quando o botão', () => {
  const { getByTestId } = renderWithRouter(<App />);
  expect(getByTestId('next-pokemon')).toHaveTextContent(/Próximo pokémon/i);
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByTestId, getByRole } = renderWithRouter(<App />);
  const allButton = getByRole('button', { name: /All/i });
  expect(allButton).toBeInTheDocument();
  userEvent.click(allButton);
  pokemons.forEach((pokemon) => {
    expect(getByTestId('pokemon-name')).toHaveTextContent(pokemon.name);
    userEvent.click(getByTestId('next-pokemon'));
  });
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const filtersButton = getAllByTestId('pokemon-type-button');
  const filterQtd = 7;
  expect(filtersButton.length).toBe(filterQtd);
  const filtTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  for (let index = 0; index < filterQtd; index += 1) {
    expect(filtersButton[index]).toHaveTextContent(filtTypes[index]);
  }
});
