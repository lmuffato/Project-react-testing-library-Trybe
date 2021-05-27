import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Componente PokemonDetails', () => {
  test('Teste se as informações detalhadas'
  + 'do Pokémon selecionado são mostradas na tela', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkMoreDatails = getByText('More details');
    fireEvent.click(linkMoreDatails);
    expect(linkMoreDatails).not.toBeInTheDocument();
    const title = getByText(`${pokemons[0].name} Details`);
    expect(title).toBeInTheDocument();
  });
});
