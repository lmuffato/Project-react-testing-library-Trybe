import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente "Pokedex".', () => {
  const pokeIdCardName = 'pokemon-name';
  const pokeIdType = 'pokemon-type';
  const pokeIdWeight = 'pokemon-weight';

  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByRole } = renderWithRouter(<App />);

    const pokedexTitle = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(pokedexTitle).toBeInTheDocument();
  });

  it(`Teste se é exibido o próximo Pokémon da lista 
    quando o botão Próximo pokémon é clicado.`, () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    const nextPokemon = getByText('Próximo pokémon');

    userEvent.click(nextPokemon);
    let newPokemon = getByTestId(pokeIdCardName);
    expect(newPokemon.textContent).toBe('Charmander');

    userEvent.click(nextPokemon);
    newPokemon = getByTestId(pokeIdCardName);
    expect(newPokemon.textContent).toBe('Caterpie');

    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    newPokemon = getByTestId(pokeIdCardName);
    expect(newPokemon.textContent).toBe('Pikachu');

    expect(nextPokemon).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const name = getAllByTestId(pokeIdCardName);
    const type = getAllByTestId(pokeIdType);
    const weight = getAllByTestId(pokeIdWeight);

    expect(name.length).toBe(1);
    expect(type.length).toBe(1);
    expect(weight.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const filterButton = getByRole('button', {
      name: 'Fire',
    });
    const nextPokemon = getByRole('button', {
      name: 'Próximo pokémon',
    });

    userEvent.click(filterButton);
    const filteredPokemon = getByText('Charmander');
    expect(filteredPokemon).toBeInTheDocument();

    userEvent.click(nextPokemon);
    const nextFilteredPokemon = getByText('Rapidash');
    expect(nextFilteredPokemon).toBeInTheDocument();
  });
});
