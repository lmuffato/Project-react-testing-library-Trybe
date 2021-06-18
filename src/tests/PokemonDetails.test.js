import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

// number: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number
// usado para conversão do ID que é um numero e não string;
describe('requisito 7', () => {
  const getPokemonById = (id) => {
    const convert = Number(id);
    return pokemons.find((pokemon) => pokemon.id === convert);
  };

  test('Verifica as informações detalhadas do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const { name, id, summary } = getPokemonById('25');
    const link = screen.getByRole('link', { name: 'More details' });
    history.push(`/pokemons/25`);
    expect(link.href).toMatch(`/pokemons/${id}`);
    userEvent.click(link);
    expect(screen.getByRole('heading', { name: `${name} Details` })).toBeInTheDocument();
    const summarySource = 'Summary';
    expect(screen.getByRole('heading', { name: `${summarySource}` })).toBeInTheDocument();
    expect(screen.getByText(summary)).toBeInTheDocument();
  });
  test('Testa se existe na página uma seção com os mapas', () => {
    const { history } = renderWithRouter(<App />);
    const { id } = getPokemonById('10');
    history.push(`/pokemons/${id}`);
    expect(screen.getByRole('heading', { name: /Game Locations of Caterpie/i }))
      .toBeInTheDocument();
    const map = screen.getAllByRole('img');
    const mapImag = map[1];
    const sourceMap = 'https://cdn2.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png';
    const altMapOne = 'Caterpie location';
    expect(mapImag.src).toEqual(sourceMap);
    expect(mapImag.alt).toEqual(altMapOne);
    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
  });
});

// npx stryker run ./stryker/PokemonDetails.conf.json
