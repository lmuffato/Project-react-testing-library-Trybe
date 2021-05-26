import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Componente Pokedex', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2 = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(h2).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByText } = renderWithRouter(<App />);
    const text = getAllByText(/More details/);
    expect(text.length).toBe(1);
  });

  test('Teste se é exibido o próximo Pokémon ao clicar no botão Próximo pokémon ', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const btn = getByTestId('next-pokemon');
    const currPokemon = getByTestId('pokemon-name');
    expect(btn).toBeInTheDocument();
    expect(btn.type).toBe('button');
    expect(currPokemon).toHaveTextContent('Pikachu');
    expect(currPokemon).not.toHaveTextContent('Charmander');
    fireEvent.click(btn);
    expect(currPokemon).not.toHaveTextContent('Pikachu');
    expect(currPokemon).toHaveTextContent('Charmander');
  });

  test('Estando no último, volta ao primeiro Pokémon, clicando em Próximo ', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const nameFistPokemon = pokemons[0].name;
    const regex = new RegExp(nameFistPokemon);
    const btn = getByTestId('next-pokemon');
    const currPokemon = getByTestId('pokemon-name');

    pokemons.forEach(() => {
      fireEvent.click(btn);
    });
    expect(currPokemon).toHaveTextContent(regex);
  });
});
