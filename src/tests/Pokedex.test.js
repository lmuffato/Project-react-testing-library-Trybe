import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  const testIdTypePokemon = 'pokemon-type-button';
  const tesIdNamePokemon = 'pokemon-name';
  const testPokemonNamesOnScreen = (pokemonNames, buttonNext, screen) => {
    pokemonNames.forEach((pokemonName) => {
      const pokemonNameOnScreen = screen
        .getByTestId(tesIdNamePokemon);
      expect(pokemonNameOnScreen.innerHTML).toBe(pokemonName);
      userEvent.click(buttonNext);
    });
  };
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const screen = renderWithRouter(<App />);
    const heading = screen
      .getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo Pokémon da lista'
  + ' quando o botão Próximo pokémon é clicado.', () => {
    const screen = renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    let pokemonName = screen
      .getByTestId(tesIdNamePokemon);
    expect(pokemonName.innerHTML).toBe('Pikachu');
    userEvent.click(buttonNext);
    pokemonName = screen
      .getByTestId(tesIdNamePokemon);
    expect(pokemonName.innerHTML).toBe('Charmander');
  });
  it('Os próximos Pokémons da lista devem ser mostrados, um a um,'
  + ' ao clicar sucessivamente no botão, voltado para o inicial após o último', () => {
    const screen = renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    const pokemonNames = pokemons.map((pokemon) => pokemon.name);
    testPokemonNamesOnScreen(pokemonNames, buttonNext, screen);
    const pokemonNameOnScreen = screen
      .getByTestId(tesIdNamePokemon);
    expect(pokemonNameOnScreen.innerHTML).toBe('Pikachu');
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const screen = renderWithRouter(<App />);
    const pokemonNames = screen
      .getAllByTestId(tesIdNamePokemon);
    expect(pokemonNames.length).toBe(1);
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const screen = renderWithRouter(<App />);
    const filterButtons = screen
      .getAllByTestId(testIdTypePokemon);
    expect(filterButtons[0]).toBeInTheDocument();
    const amountOfPokemonsTypes = 7;
    expect(filterButtons.length).toBe(amountOfPokemonsTypes);
  });
  it(`A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos
  pokémons daquele tipo. O texto do botão deve corresponder ao nome do tipo;`, () => {
    const screen = renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    const filterButtons = screen.getAllByTestId(testIdTypePokemon);
    userEvent.click(filterButtons[1]);
    for (let index = 0; index < 2; index += 1) {
      const pokemonTypeOnScreen = screen
        .getByTestId('pokemon-type');
      expect(pokemonTypeOnScreen.innerHTML).toBe(filterButtons[1].innerHTML);
      userEvent.click(buttonNext);
    }
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const screen = renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    const pokemonNames = pokemons.map((pokemon) => pokemon.name);
    const filterButtons = screen.getAllByTestId(testIdTypePokemon);
    const buttonResetFilter = screen.getByRole('button', { name: 'All' });
    userEvent.click(filterButtons[1]);
    userEvent.click(buttonResetFilter);
    testPokemonNamesOnScreen(pokemonNames, buttonNext, screen);
    const pokemonNameOnScreen = screen
      .getByTestId(tesIdNamePokemon);
    expect(pokemonNameOnScreen.innerHTML).toBe('Pikachu');
  });
  it(`O botão de Próximo pokémon deve ser desabilitado quando a lista 
  filtrada de Pokémons tiver um só pokémon.`, () => {
    const screen = renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonNext.disabled).toBe(false);
    const filterButtons = screen.getAllByTestId(testIdTypePokemon);
    const buttonResetFilter = screen.getByRole('button', { name: 'All' });
    userEvent.click(filterButtons[0]);
    expect(buttonNext.disabled).toBe(true);
    userEvent.click(buttonResetFilter);
    expect(buttonNext.disabled).toBe(false);
  });
});
