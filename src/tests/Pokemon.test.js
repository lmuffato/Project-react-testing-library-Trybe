import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
  const { getByTestId, getByRole } = renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
    isFavorite={ false }
  />);
  const nome = getByTestId('pokemon-name');
  const tipo = getByTestId('pokemon-type');
  const peso = getByTestId('pokemon-weight');
  const img = getByRole('img');
  expect(img.src).toBe(pokemons[0].image);
  expect(img.alt).toBe(`${pokemons[0].name} sprite`);
  expect(tipo).toHaveTextContent(pokemons[0].type);
  expect(nome).toHaveTextContent(pokemons[0].name);
  expect(peso).toHaveTextContent(
    `Average weight: ${pokemons[0]
      .averageWeight.value} ${pokemons[0]
      .averageWeight.measurementUnit}`,
  );
});

test('Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
  const { getByRole } = renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
    isFavorite={ false }
  />);
  const det = getByRole('link', { name: 'More details' });
  expect(det.href).toBe(`http://localhost/pokemons/${pokemons[0].id}`);
});

test('redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
  const { getByRole, history } = renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
    isFavorite={ false }
  />);
  const det = getByRole('link', { name: 'More details' });
  fireEvent.click(det);
  expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getAllByRole } = renderWithRouter(<Pokemon
    pokemon={ pokemons[0] }
    isFavorite
  />);
  const icons = getAllByRole('img');
  expect(icons[1].src).toBe('http://localhost/star-icon.svg');
  expect(icons[1].alt).toBe(`${pokemons[0].name} is marked as favorite`);
});
