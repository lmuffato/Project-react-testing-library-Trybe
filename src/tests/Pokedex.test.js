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
  test('Teste se é exibido o próximo Pokémon da lista quando o bt é clicado.', () => {
    renderWithRouter(<App />);
    const btnType = screen.getAllByRole('button');
    const psychicType = btnType[5];
    userEvent.click(psychicType);

    const pokemonName = screen.getByTestId(pokeName);
    const alakazam = pokemonName;
    expect(alakazam.innerHTML).toBe('Alakazam');

    const btnNextPokemon = screen.getByTestId(nextPokemon);
    userEvent.click(btnNextPokemon);

    const mew = pokemonName;
    expect(mew.innerHTML).toBe('Mew');
    userEvent.click(btnNextPokemon);

    const alakazamAgain = pokemonName;
    expect(alakazamAgain.innerHTML).toBe('Alakazam');
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
    expect(btnFilterType[0]).toBeInTheDocument();
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
  });
  test('O texto do botão deve corresponder ao nome do tipo', () => {
    renderWithRouter(<App />);
    const btn = screen.getAllByRole('button');
    expect(btn[1].innerHTML).toBe('Electric');
    expect(btn[2].innerHTML).toBe('Fire');
    expect(btn[3].innerHTML).toBe('Bug');
    expect(btn[4].innerHTML).toBe('Poison');
    expect(btn[5].innerHTML).toBe('Psychic');
    expect(btn[6].innerHTML).toBe('Normal');
    expect(btn[7].innerHTML).toBe('Dragon');
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
    const btndragonType = btn[7];
    userEvent.click(btndragonType);
    expect(pokemonType.innerHTML).toBe('Dragon');
    userEvent.click(btn[0]);
    expect(pokemonType.innerHTML).toBe('Electric');
  });
});
