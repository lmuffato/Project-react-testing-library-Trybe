import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemonType = 'pokemon-type';

describe('test the Pokedex component', () => {
  test('encountered pokémons heading (h2)', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const heading = getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  test('test if the only one pokémon is displayed'
  + ' in the list when the "next pokémon" button is clicked', () => {
    const { getByTestId, getAllByTestId, getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const paragraph = getByText(/Próximo pokémon/i);
    expect(paragraph).toBeInTheDocument();
    userEvent.click(paragraph);
    // A seguir, testo cada um dos elementos da pokedex pelos test-ids
    // Todos os pokemons possuem o mesmo test id, então pegando todos eles e verificando o length
    // é possível saber sua quantidade.
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    const numberPokeName = getAllByTestId('pokemon-name');
    expect(numberPokeName.length).toBe(1);
    // ------------------------------------------------------------
    const pokeType = getByTestId(pokemonType);
    expect(pokeType).toBeInTheDocument();
    const numberPokeType = getAllByTestId(pokemonType);
    expect(numberPokeType.length).toBe(1);
    // ------------------------------------------------------------
    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeWeight).toBeInTheDocument();
    const numberPokeWeight = getAllByTestId('pokemon-weight');
    expect(numberPokeWeight.length).toBe(1);
  });

  test('test the filter button', () => {
    const { getAllByTestId, getByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const filterBtns = getAllByTestId('pokemon-type-button');
    const electricPkm = getByRole('button', { name: /Electric/i });
    const electricFilter = filterBtns[0].textContent;
    const firePkm = getByRole('button', { name: /Fire/i });
    const fireFilter = filterBtns[1].textContent;
    const bugPkm = getByRole('button', { name: /Bug/i });
    const bugFilter = filterBtns[2].textContent;
    const poisonPkm = getByRole('button', { name: /Poison/i });
    const poisonFilter = filterBtns[3].textContent;
    const psychicPkm = getByRole('button', { name: /Psychic/i });
    const psychicFilter = filterBtns[4].textContent;
    const normalPkm = getByRole('button', { name: /Normal/i });
    const normalFilter = filterBtns[5].textContent;
    const dragonPkm = getByRole('button', { name: /Dragon/i });
    const dragonFilter = filterBtns[6].textContent;
    expect(electricFilter).toBe(electricPkm.innerHTML);
    expect(fireFilter).toBe(firePkm.innerHTML);
    expect(bugFilter).toBe(bugPkm.innerHTML);
    expect(poisonFilter).toBe(poisonPkm.innerHTML);
    expect(psychicFilter).toBe(psychicPkm.innerHTML);
    expect(normalFilter).toBe(normalPkm.innerHTML);
    expect(dragonFilter).toBe(dragonPkm.innerHTML);
  });

  /*
  O teste abaixo foi feito em conjunto com Felipe Flores (https://github.com/FelipeFloresWeb).
  foram extraídas as informações dos pokemons no arquivo "data.js" e utilizado um map para retornar
  os tipos (elétrico, fogo, inseto, etc.) de cada pokemon. Entretanto, alguns deles eram repetidos, portanto foi feito um forEach para adicionar
  à um array vazio apenas aqueles que não eram repetidos (não incluíam um type que ja estava no array). À partir
  disto foi feito outro forEach para utilizar o array dos tipos para selecionar os botões pelos seus respectivos
  conteúdos (name) e para verificar, no toMatch, se os botões já existentes na página possuiam os tipos extraídos da array.
  O teste também contempla a funcionalidade do botão "next pokemon" que muda o pokemon da pokedex para outro de mesmo tipo.
  */

  test('test if the filter button is dinamically created', () => {
    const { getByTestId, getByText, getByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const pokeTypesArray = pokemons.map((pokemon) => pokemon.type);
    const filtredPokemons = [];
    pokeTypesArray.forEach((type) => {
      if (!filtredPokemons.includes(type)) return filtredPokemons.push(type);
    });
    filtredPokemons.forEach((type) => {
      const buttonType = getByRole('button', { name: type });
      const nextButton = getByText(/Próximo pokémon/i);
      const pkmType = getByTestId(pokemonType);
      expect(buttonType).toBeInTheDocument();
      userEvent.click(buttonType);
      expect(pkmType.innerHTML).toMatch(type);
      userEvent.click(nextButton);
      expect(pkmType.innerHTML).toMatch(type);
    });
  });

  test('test if Pokedex has a filter reset button', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const allButton = getByRole('button', { name: /All/i });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    const firstPokemon = getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
});
