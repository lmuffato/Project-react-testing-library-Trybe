import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter.helper';
import App from '../App';
import dataPokemon from '../data';

const nextPokemonConst = 'next-pokemon';
const pokemonNameConst = 'pokemon-name';
const pokemonTypeButtonConst = 'pokemon-type-button';

describe('Requisito 5', () => {
  test('A página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const encounteredPokemonsH2 = screen.getByRole('heading', { level: 2 });
    expect(encounteredPokemonsH2).toBeInTheDocument();
    expect(encounteredPokemonsH2).toHaveTextContent(/Encountered pokémons/i);
  });

  test('Exibir o próximo Pokémon quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByTestId(nextPokemonConst);
    expect(buttonNextPokemon).toHaveTextContent(/próximo pokémon/i);

    dataPokemon.forEach((pokemon, index, array) => {
      const nextPokemon = screen.getByTestId(pokemonNameConst);
      expect(nextPokemon).toHaveTextContent(new RegExp(pokemon.name, 'i'));
      userEvent.click(buttonNextPokemon);
      if (pokemon === array[array.length - 1]) {
        expect(nextPokemon).toHaveTextContent(new RegExp(array[0].name, 'i'));
      }
    });
  });

  test('É mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByTestId(nextPokemonConst);

    dataPokemon.forEach((pokemon) => {
      const nextPokemon = screen.getAllByTestId(pokemonNameConst);
      expect(nextPokemon).toHaveLength(1);
      expect(nextPokemon[0]).toHaveTextContent(pokemon.name);
      userEvent.click(buttonNextPokemon);
    });
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByTestId(nextPokemonConst);
    const pokemonTypeButtons = screen.getAllByTestId(pokemonTypeButtonConst);
    const allTypeButtons = [...new Set(dataPokemon.map((pokemon) => pokemon.type))];

    expect(pokemonTypeButtons).toHaveLength(allTypeButtons.length);

    allTypeButtons.forEach((pokemonType, index) => {
      expect(pokemonTypeButtons[index]).toHaveTextContent(pokemonType);
      userEvent.click(buttonNextPokemon);
    });
  });

  test('A partir da seleção de um botão de tipo, a Pokédex deve circular'
    + 'somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByTestId(nextPokemonConst);
    const pokemonTypeButtons = screen.getAllByTestId(pokemonTypeButtonConst);

    pokemonTypeButtons.forEach((pokemonTypeButton) => {
      const pokemonsType = dataPokemon
        .filter((pokemon) => pokemon.type === pokemonTypeButton.textContent)
        .map((pokemon) => pokemon.type);

      userEvent.click(screen.getByRole('button',
        { name: pokemonTypeButton.textContent }));

      pokemonsType.forEach((pokemonType) => {
        const typePokemon = screen.getByTestId('pokemon-type');
        expect(typePokemon).toHaveTextContent(pokemonType);
        userEvent.click(buttonNextPokemon);
      });
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    screen.getByRole('button', { name: 'All' });
  });

  test('A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros)'
    + 'quando o botão All for clicado', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonAll);
    const buttonNextPokemon = screen.getByTestId(nextPokemonConst);

    dataPokemon.forEach((pokemon, _index, array) => {
      const pokemonName = screen.getByTestId(pokemonNameConst);
      expect(pokemonName).toHaveTextContent(new RegExp(pokemon.name, 'i'));
      userEvent.click(buttonNextPokemon);
      if (pokemon === array[array.length - 1]) {
        expect(pokemonName).toHaveTextContent(new RegExp(array[0].name, 'i'));
      }
    });
  });

  test('O botão de Próximo pokémon deve ser desabilitado quando a lista filtrada'
   + 'de Pokémons tiver um só pokémon', () => {
    renderWithRouter(<App />);
    const pokemonTypeButtons = screen.getAllByTestId(pokemonTypeButtonConst);

    pokemonTypeButtons.forEach((pokemonTypeButton) => {
      const pokemonsType = dataPokemon
        .filter((pokemon) => pokemon.type === pokemonTypeButton.textContent)
        .map((pokemon) => pokemon.type);

      userEvent.click(screen.getByRole('button',
        { name: pokemonTypeButton.textContent }));
      const buttonNextPokemon = screen.getByTestId(nextPokemonConst);
      if (pokemonsType.length === 1) {
        expect(buttonNextPokemon).toHaveAttribute('disabled');
      } else {
        expect(buttonNextPokemon).not.toHaveAttribute('disabled');
      }
    });
  });
});
