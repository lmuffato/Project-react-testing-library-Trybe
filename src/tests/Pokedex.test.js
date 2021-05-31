import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente "Pokedex".', () => {
  const pokeIdCardName = 'pokemon-name';
  const pokeIdType = 'pokemon-type';
  const pokeIdWeight = 'pokemon-weight';
  const nextButtonText = 'Próximo pokémon';

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

    const nextPokemon = getByText(nextButtonText);

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
      name: nextButtonText,
    });

    userEvent.click(filterButton);
    const filteredPokemon = getByText('Charmander');
    expect(filteredPokemon).toBeInTheDocument();

    userEvent.click(nextPokemon);
    const nextFilteredPokemon = getByText('Rapidash');
    expect(nextFilteredPokemon).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    const { getByRole } = renderWithRouter(<App />);

    const resetFilter = getByRole('button', {
      name: 'All',
    });

    expect(resetFilter).toBeInTheDocument();

    userEvent.click(resetFilter);
  });

  it(`Teste se é criado, dinamicamente, um botão 
    de filtro para cada tipo de Pokémon.`, () => {
    const { getByRole } = renderWithRouter(<App />);

    const fire = getByRole('button', { name: 'Fire' });
    const psychic = getByRole('button', { name: 'Psychic' });
    const electric = getByRole('button', { name: 'Electric' });
    const bug = getByRole('button', { name: 'Bug' });
    const poison = getByRole('button', { name: 'Poison' });
    const dragon = getByRole('button', { name: 'Dragon' });
    const normal = getByRole('button', { name: 'Normal' });

    expect(fire).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(electric).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
  });

  it(`O botão de Próximo pokémon deve ser desabilitado quando 
    a lista filtrada de Pokémons tiver um só pokémon.`, () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const bugFilter = getByRole('button', { name: 'Bug' });
    userEvent.click(bugFilter);
    const actualyPokemon = getByTestId(pokeIdCardName);
    expect(actualyPokemon.textContent).toBe('Caterpie');

    const nextPokemon = getByRole('button', { name: nextButtonText });
    userEvent.click(nextPokemon);
    const updatePokemon = getByTestId(pokeIdCardName);
    expect(updatePokemon.textContent).toBe('Caterpie');
  });
});
