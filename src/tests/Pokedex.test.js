import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa todo o Componente "Pokedex"', () => {
  const nextpokemon = () => screen.getByTestId('pokemon-name').innerHTML;

  const pokemonsTypes = () => ['Electric', 'Fire', 'Bug',
    'Poison', 'Psychic', 'Normal', 'Dragon'];

  const PokemonsNames = () => ['Pikachu', 'Charmander', 'Caterpie',
    'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

  test('Verifica se página contém um heading h2 com o'
  + ' texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByText(/Encountered pokémons/);

    expect(h2).toBeInTheDocument();
  });

  test('Verifica se é exibido o próximo Pokémon da lista quando o'
  + 'botão Próximo pokémon é clicado. Teste também '
  + 'se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const button = screen.getByText(/Próximo pokémon/);
    expect(button).toBeInTheDocument();

    // Função que pode ser usada para evitar muitas linhas porém não encontrei solução para caso seja o ultimo elemento do array retornar o "pikachu"
    // PokemonsNames.forEach((pokemon) => {
    //   expect(nextpokemon()).toBe(pokemon);
    //   userEvent.click(button);
    // });

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames()[1]);

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames()[2]);

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames()[3]);

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames()[4]);

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames()[5]);

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames()[6]);

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames()[7]);

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames()[8]);

    userEvent.click(button);
    expect(nextpokemon()).toBe(PokemonsNames()[0]);
  });

  test('Verifica se a Pokédex tem os botões de filtro.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const buttons = getAllByTestId('pokemon-type-button');
    const buttonsText = buttons.map((button) => button.innerHTML);
    pokemonsTypes().forEach((type, index) => expect(type).toMatch(buttonsText[index]));
  });

  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByText('All');
    expect(buttonAll.innerHTML).toBe('All');
    const button = screen.getByText(/Próximo pokémon/);

    userEvent.click(buttonAll);

    PokemonsNames().forEach((pokemon) => {
      expect(nextpokemon()).toBe(pokemon);
      userEvent.click(button);
    });
  });

  test('Verifica se o botão de Próximo pokémon fica desabilitado '
  + 'quando a lista filtrada de Pokémons tiver um só pokémon', () => {
    renderWithRouter(<App />);

    const buttonElectrick = screen.getAllByText('Electric')[1];
    userEvent.click(buttonElectrick);
    const buttonNext = screen.getByText('Próximo pokémon');
    expect(buttonNext).toHaveAttribute('disabled');
  });
});
