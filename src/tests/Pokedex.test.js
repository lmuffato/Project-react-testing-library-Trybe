import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  test('Se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  test('É exibido o próx. Pokémon da lista quando o b. Próx pokémon é clicado.', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonName = getByText(/Próximo pokémon/i);
    pokemons.forEach((pokemon) => {
      const selectPokemon = getByText(pokemon.name);
      expect(selectPokemon).toBeInTheDocument();
      userEvent.click(buttonName);
    });
  });
  test('Se o botão deve conter o texto Próximo pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonName = getByText(/Próximo pokémon/i);
    expect(buttonName).toBeInTheDocument();
  });
  test('Se selecionar o btn tipo fire, monstra apenas pkm do mesmo daquele tipo;', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonName = getByText('Fire');
    const btnNext = getByText(/Próximo pokémon/i);
    userEvent.click(buttonName);
    const filter = pokemons.filter((pokemon) => pokemon.type === buttonName);
    filter.forEach((pokemon) => {
      expect(pokemon.type).toBe(buttonName);
      userEvent.click(btnNext);
    });
  });
  test('Se selecionar o btn tipo Psychic, monstra apenas pkm do mesmo tipo;', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonName = getByText('Psychic');
    const btnNext = getByText(/Próximo pokémon/i);
    userEvent.click(buttonName);
    const filter = pokemons.filter((pokemon) => pokemon.type === buttonName);
    filter.forEach((pokemon) => {
      expect(pokemon.type).toBe(buttonName);
      userEvent.click(btnNext);
    });
  });
  test('Se são retirados os filtros quando o botão All for clicado', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnAll = getByText('All');
    const btnNext = getByText(/Próximo pokémon/i);
    userEvent.click(btnAll);
    let cont = 0;
    pokemons.forEach(() => {
      userEvent.click(btnNext);
      cont += 1;
    });
    expect(cont).toBe(pokemons.length);
  });
  test('se ao carregar a página, o filtro selecionado deverá ser All;', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnNext = getByText(/Próximo pokémon/i);
    let cont = 0;
    pokemons.forEach(() => {
      userEvent.click(btnNext);
      cont += 1;
    });
    expect(cont).toBe(pokemons.length);
  });
  test('Se tem apenas um btn de filtro por tipo de Pokémon disponível nos dado', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const arrayTypes = [];
    pokemons.forEach((pokemon) => {
      arrayTypes.push(pokemon.type);
    });
    const listType = [...new Set(arrayTypes)];
    // pequisa site: https://www.delftstack.com/pt/howto/javascript/javascript-remove-duplicates-from-an-array/
    const filterbtn = getAllByTestId('pokemon-type-button');
    expect(filterbtn.length).toBe(listType.length);
  });
});
