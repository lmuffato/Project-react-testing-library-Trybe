import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const getPokemonById = (id) => {
  const convert = Number(id);
  return pokemons.find((pokemon) => pokemon.id === convert);
};

test('Teste se as informações detalhadas do Pokémon', () => {
  const { history } = renderWithRouter(<App />);
  const { name, id, summary } = getPokemonById('25');
  const link = screen.getByRole('link', { name: 'More details' });
  history.push(`/pokemons/${id}`);
  expect(link.href).toMatch(`/pokemons/${id}`);
  userEvent.click(link);

  expect(screen.getByRole('heading', { name: `${name} Details` })).toBeInTheDocument();
  const summaryStr = 'Summary';
  expect(screen.getByRole('heading', { name: `${summaryStr}` })).toBeInTheDocument();
  expect(screen.getByText(summary)).toBeInTheDocument();
});
test('Teste se existe na página uma seção com os mapas', () => {
  const { history } = renderWithRouter(<App />);
  const { id } = getPokemonById('25');
  history.push(`/pokemons/${id}`);
  expect(screen.getByRole('heading', { name: /Game Locations of Pikachu/i }))
    .toBeInTheDocument();

  const mapOne = screen.getAllByRole('img');
  const imgMapOne = mapOne[1];
  const sourceMapOne = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
  const altMapOne = 'Pikachu location';
  expect(imgMapOne.src).toEqual(sourceMapOne);
  expect(imgMapOne.alt).toEqual(altMapOne);

  const labelFav = screen.getByLabelText('Pokémon favoritado?');
  expect(labelFav).toBeInTheDocument();
});
// test('', () => {});
// test('', () => {});
// test('', () => {});
// test('', () => {});
// test('', () => {});
// test('', () => {});
// test('', () => {});
