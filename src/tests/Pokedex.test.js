import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o bt é clicado.', () => {
    renderWithRouter(<App />);
    const btnType = screen.getAllByRole('button');
    const psychicType = btnType[5];
    userEvent.click(psychicType);

    const pokemonName = screen.getByTestId('pokemon-name');
    const alakazam = pokemonName;
    expect(alakazam.innerHTML).toBe('Alakazam');

    const btnNextPokemon = screen.getByTestId('next-pokemon');
    userEvent.click(btnNextPokemon);

    const mew = pokemonName;
    expect(mew.innerHTML).toBe('Mew');
    userEvent.click(btnNextPokemon);

    const alakazamAgain = pokemonName;
    expect(alakazamAgain.innerHTML).toBe('Alakazam');
  });
});
describe('Testa os botões de filtro', () => {
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const btnFilterType = screen.getAllByTestId('pokemon-type-button');
    expect(btnFilterType[0]).toBeInTheDocument();
  });
  test('Testa se ao clicar em filtro, os pokemons são daquele tipo', () => {
    renderWithRouter(<App />);
    const btnFilterType = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(btnFilterType[1]);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe('Fire');

    const btnNextPokemon = screen.getByTestId('next-pokemon');
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
