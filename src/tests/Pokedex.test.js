import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokeType = 'pokemon-type';
const btnPokeType = 'pokemon-type-button';
const pokeName = 'pokemon-name';
const nextPokemon = 'next-pokemon';

describe('Testa o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByTestId(pokeName);
    expect(pokemonName.length).toBe(1);
  });
  test('testa o nome do botão de proximo pokemon', () => {
    renderWithRouter(<App />);
    const btnNextPokemon = screen.getByTestId(nextPokemon);
    expect(btnNextPokemon.innerHTML).toBe('Próximo pokémon');
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o bt é clicado.', () => {
    renderWithRouter(<App />);
    const btnType = screen.getAllByRole('button');
    const psychicType = btnType[5];
    userEvent.click(psychicType);

    const pokemonName = screen.getByTestId(pokeName);
    expect(pokemonName.innerHTML).toBe('Alakazam');

    const btnNextPokemon = screen.getByTestId(nextPokemon);
    userEvent.click(btnNextPokemon);

    expect(pokemonName.innerHTML).toBe('Mew');
    userEvent.click(btnNextPokemon);

    expect(pokemonName.innerHTML).toBe('Alakazam');
  });
  test('Testa botão de Próximo, desabilitado quando a lista tiver um só pokémon.', () => {
    renderWithRouter(<App />);
    const btnpokemonsTypes = screen.getAllByTestId(btnPokeType);
    userEvent.click(btnpokemonsTypes[5]);
    const snorlax = screen.getByTestId(pokeName);
    expect(snorlax.innerHTML).toBe('Snorlax');
    const nextPok = screen.getByTestId(nextPokemon);
    expect(nextPok).toBeDisabled();
  });
});
describe('Testa os botões de filtro', () => {
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const btnFilterType = screen.getAllByTestId(btnPokeType);
    const filterTotal = 7;
    expect(btnFilterType[0]).toBeInTheDocument();
    expect(btnFilterType[5]).toBeInTheDocument();
    expect(btnFilterType.length).toBe(filterTotal);
  });
  test('Testa se ao clicar em filtro, os pokemons são daquele tipo', () => {
    renderWithRouter(<App />);
    const btnFilterType = screen.getAllByTestId(btnPokeType);
    userEvent.click(btnFilterType[1]);
    const pokemonType = screen.getByTestId(pokeType);
    expect(pokemonType.innerHTML).toBe('Fire');

    const btnNextPokemon = screen.getByTestId(nextPokemon);
    userEvent.click(btnNextPokemon);
    expect(pokemonType.innerHTML).toBe('Fire');

    userEvent.click(btnFilterType[2]);
    expect(pokemonType.innerHTML).toBe('Bug');
    userEvent.click(btnNextPokemon);
    expect(pokemonType.innerHTML).toBe('Bug');
  });
  test('O texto do botão deve corresponder ao nome do tipo', () => {
    renderWithRouter(<App />);
    const btn = screen.getAllByRole('button');
    const pokemonType = screen.getByTestId(pokeType);
    userEvent.click(btn[1]);
    expect(btn[1].innerHTML).toBe('Electric');
    expect(pokemonType.innerHTML).toBe('Electric');

    userEvent.click(btn[2]);
    expect(btn[2].innerHTML).toBe('Fire');
    expect(pokemonType.innerHTML).toBe('Fire');

    userEvent.click(btn[3]);
    expect(btn[3].innerHTML).toBe('Bug');
    expect(pokemonType.innerHTML).toBe('Bug');

    userEvent.click(btn[4]);
    expect(btn[4].innerHTML).toBe('Poison');
    expect(pokemonType.innerHTML).toBe('Poison');

    userEvent.click(btn[5]);
    expect(btn[5].innerHTML).toBe('Psychic');
    expect(pokemonType.innerHTML).toBe('Psychic');

    userEvent.click(btn[6]);
    expect(btn[6].innerHTML).toBe('Normal');
    expect(pokemonType.innerHTML).toBe('Normal');

    userEvent.click(btn[7]);
    expect(btn[7].innerHTML).toBe('Dragon');
    expect(pokemonType.innerHTML).toBe('Dragon');
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
  });
  test('Mostrar os Pokémons (sem filtros) quando All for clicado;', () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId(pokeType);
    expect(pokemonType.innerHTML).toBe('Electric');
    const btn = screen.getAllByRole('button');
    const dragonButton = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(dragonButton);
    expect(pokemonType.innerHTML).toBe('Dragon');
    userEvent.click(btn[0]);
    expect(pokemonType.innerHTML).toBe('Electric');
    const nextPok = screen.getByTestId(nextPokemon);
    userEvent.click(nextPok);
    expect(pokemonType.innerHTML).toBe('Fire');
  });
});
