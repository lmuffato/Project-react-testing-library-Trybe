import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const nextPokemon = 'next-pokemon';
const pokemonName = 'pokemon-name';
const pokemonTypeButton = 'pokemon-type-button';

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
    const btn = getByTestId(nextPokemon);
    const currPokemon = getByTestId(pokemonName);
    expect(btn).toBeInTheDocument();
    expect(btn.type).toBe('button');
    expect(btn.className).toContain('pokedex-button');
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
    const btnN = getByTestId(nextPokemon);
    const currPokemon = getByTestId(pokemonName);

    pokemons.forEach(() => {
      fireEvent.click(btnN);
    });
    expect(currPokemon).toHaveTextContent(regex);
  });

  test('Testa se clicando em All, retira o filtro por tipo', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const five = 5;
    const btnNext = getByTestId(nextPokemon);
    const btnAll = getByText('All');
    expect(btnAll).toBeInTheDocument();
    expect(btnAll.className).toContain('filter-button');
    expect(btnAll.type).toBe('button');
    fireEvent.click(btnAll);
    const pokName = getByTestId(pokemonName);
    expect(pokName.textContent).toEqual('Pikachu');
    expect(pokName.textContent).not.toEqual('Mew');
    fireEvent.click(btnNext);
    expect(pokName.textContent).toEqual('Charmander');
    expect(pokName.textContent).not.toEqual('Mew');
    fireEvent.click(btnAll);
    for (let i = 0; i < five; i += 1) fireEvent.click(btnNext);
    expect(pokName.textContent).toEqual('Mew');
    expect(pokName.textContent).not.toEqual('Pikachu');

    fireEvent.click(btnAll);
    for (let i = 0; i < pokemons.length; i += 1) {
      fireEvent.click(btnNext);
    }
    expect(pokName.textContent).toEqual('Pikachu');
    fireEvent.click(btnNext);
    expect(pokName.textContent).toEqual('Charmander');
  });

  test('Teste se tem 7 botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const numberOfFilterButtons = 7;
    const btnsFilter = getAllByTestId(pokemonTypeButton);
    expect(btnsFilter.length).toBe(numberOfFilterButtons);
  });

  test('Teste filtros', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const pokName = getByTestId(pokemonName);
    expect(pokName.textContent).toEqual('Pikachu');
    const btnsFilter = getAllByTestId(pokemonTypeButton);
    fireEvent.click(btnsFilter[1]);
    expect(pokName.textContent).toEqual('Charmander');
    fireEvent.click(btnsFilter[4]);
    expect(pokName.textContent).toEqual('Alakazam');
    fireEvent.click(btnsFilter[3]);
    expect(pokName.textContent).toEqual('Ekans');
    fireEvent.click(btnsFilter[2]);
    expect(pokName.textContent).toEqual('Caterpie');
    fireEvent.click(btnsFilter[0]);
    expect(pokName.textContent).toEqual('Pikachu');
    fireEvent.click(btnsFilter[5]);
    expect(pokName.textContent).toEqual('Snorlax');
    fireEvent.click(btnsFilter[6]);
    expect(pokName.textContent).toEqual('Dragonair');
  });
});
