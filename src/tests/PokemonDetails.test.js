import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Componente PokemonDetails', () => {
  test('Teste se as informações detalhadas'
  + 'do Pokémon selecionado são mostradas na tela', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const linkMoreDatails = getByText('More details');
    fireEvent.click(linkMoreDatails);
    expect(linkMoreDatails).not.toBeInTheDocument();
    const title = getByText(`${pokemons[0].name} Details`);
    const summary = getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(linkMoreDatails).not.toBeInTheDocument();
    expect(getByText(pokemons[0].summary)).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os'
  + 'mapas contendo as localizações do pokémon', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const linkMoreDatails = getByText('More details');
    fireEvent.click(linkMoreDatails);
    const title = `Game Locations of ${pokemons[0].name}`;
    const name = getByRole('heading', { level: 2, name: title });
    expect(name).toBeInTheDocument();
    expect(getByText(pokemons[0].foundAt[0].location)).toBeInTheDocument();
    const imgLocation = getAllByAltText(`${pokemons[0].name} location`);
    expect(imgLocation.length).toBe(pokemons[0].foundAt.length);
  });
});
