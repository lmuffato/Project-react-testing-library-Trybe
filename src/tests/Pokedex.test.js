import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={ history }>{ui}</Router>),
    history,
  };
}
// Em 80% desse requisito segui mais ou menos o que o stryker ia mostrando.
test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  expect(getByRole('heading', { name: /Encountered pokémons/i })).toBeInTheDocument();
  // expect(getByText('')).toBeInTheDocument();
});

test('Testa se botao contem nome -Próximo pokémon-', () => {
  const { getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Próximo pokémon/i));
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  const { getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Psychic/));
  fireEvent.click(getByText(/Fire/));
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/All/));
});

test('Testa se existem os btns de filtro ', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const totalBtn = 7;
  const lengthAllIdBtns = getAllByTestId('pokemon-type-button');
  expect(lengthAllIdBtns).toHaveLength(totalBtn);
});
