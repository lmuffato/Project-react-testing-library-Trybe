import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);

  const h2 = getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
  expect(h2).toBeInTheDocument();
});

test(`Teste se é exibido o próximo Pokémon da lista
quando o botão Próximo pokémon é clicado`, () => {
  const { getByRole, getByText } = renderWithRouter(<App />);

  const button = getByRole('button', { name: /Próximo pokémon/i });
  userEvent.click(button);
  const pokemon = getByText(/Charmander/);
  expect(pokemon).toBeInTheDocument();
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByRole } = renderWithRouter(<App />);

  const button = getByRole('button', { name: /All/i });
  userEvent.click(button);
});

test(`Teste se é criado, dinamicamente, um botão de filtro
para cada tipo de Pokémon`, () => {
  const { getAllByTestId } = renderWithRouter(<App />);

  const button = getAllByTestId('pokemon-type-button');
  const [electric, fire, bug, poison, psychic, normal, dragon] = button;

  expect(electric).toHaveTextContent('Electric');
  expect(fire).toHaveTextContent('Fire');
  expect(bug).toHaveTextContent('Bug');
  expect(poison).toHaveTextContent('Poison');
  expect(psychic).toHaveTextContent('Psychic');
  expect(normal).toHaveTextContent('Normal');
  expect(dragon).toHaveTextContent('Dragon');
});
