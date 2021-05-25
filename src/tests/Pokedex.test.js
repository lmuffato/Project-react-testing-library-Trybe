import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import App from '../App';

const nextPokemon = 'Próximo pokémon';

describe('Test Pokedex Component', () => {
  it('testa o h2', () => {
    const { getByRole } = render(<MemoryRouter><App /></MemoryRouter>);
    const heading = getByRole('heading', {
      name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });
  it('testa o botao proximo pokemon', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </BrowserRouter>,
    );
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const nextBtn = getByRole('button', {
      name: nextPokemon,
    });
    expect(nextBtn).toBeInTheDocument();
    for (let index = 0; index < pokemons.length; index += 1) {
      const pokemonName = getByText(pokemons[index].name);
      expect(pokemonName).toBeInTheDocument();
      for (let i = 0; i < pokemons.length; i += 1) {
        if (i !== index) {
          expect(() => getByText(pokemons[i].name)).toThrow('Unable to find an element');
        }
      }
      userEvent.click(nextBtn);
    }
    const firstPokemonName = getByText(pokemons[0].name);
    expect(firstPokemonName).toBeInTheDocument();
  });
});

describe('testa os botões de filtro (Electric, Fire, Bug e Poison)', () => {
  it('Testa o botão de filtro "Electric"', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </BrowserRouter>,
    );
    const electricBtn = getByRole('button', {
      name: 'Electric',
    });
    expect(electricBtn).toBeInTheDocument();
    userEvent.click(electricBtn);
    const electricPokemons = pokemons.filter((pokemon) => pokemon.type === 'Electric');
    const nextBtn = getByRole('button', { name: nextPokemon });
    for (let index = 0; index < electricPokemons.length; index += 1) {
      const pokemonName = getByText(electricPokemons[index].name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextBtn);
    }
    const firstPokemonName = getByText(electricPokemons[0].name);
    expect(firstPokemonName).toBeInTheDocument();
  });
  it('Testa o botão de filtro "Fire"', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </BrowserRouter>,
    );
    const fireBtn = getByRole('button', { name: 'Fire' });
    expect(fireBtn).toBeInTheDocument();
    userEvent.click(fireBtn);
    const firePokemons = pokemons.filter((pokemon) => pokemon.type === 'Fire');
    const nextBtn = getByRole('button', {
      name: nextPokemon,
    });
    for (let index = 0; index < firePokemons.length; index += 1) {
      const pokemonName = getByText(firePokemons[index].name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextBtn);
    }
    const firstPokemonName = getByText(firePokemons[0].name);
    expect(firstPokemonName).toBeInTheDocument();
  });
  it('Testa o botão de filtro "Bug"', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </BrowserRouter>,
    );
    const bugBtn = getByRole('button', { name: 'Bug' });
    expect(bugBtn).toBeInTheDocument();
    userEvent.click(bugBtn);
    const bugPokemons = pokemons.filter((pokemon) => pokemon.type === 'Bug');
    const nextBtn = getByRole('button', { name: nextPokemon });
    for (let index = 0; index < bugPokemons.length; index += 1) {
      const pokemonName = getByText(bugPokemons[index].name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextBtn);
    }
    const firstPokemonName = getByText(bugPokemons[0].name);
    expect(firstPokemonName).toBeInTheDocument();
  });
  it('Testa o botão de filtro "Poison"', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </BrowserRouter>,
    );
    const poisonBtn = getByRole('button', { name: 'Poison' });
    expect(poisonBtn).toBeInTheDocument();
    userEvent.click(poisonBtn);
    const poisonPokemons = pokemons.filter((pokemon) => pokemon.type === 'Poison');
    const nextBtn = getByRole('button', { name: nextPokemon });
    for (let index = 0; index < poisonPokemons.length; index += 1) {
      const pokemonName = getByText(poisonPokemons[index].name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextBtn);
    }
    const firstPokemonName = getByText(poisonPokemons[0].name);
    expect(firstPokemonName).toBeInTheDocument();
  });
});

describe('Testa os botões de filtro (Psychic, Normal e Dragon)', () => {
  it('Testa o botão de filtro "Psychic"', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </BrowserRouter>,
    );
    const psychicBtn = getByRole('button', { name: 'Psychic' });
    expect(psychicBtn).toBeInTheDocument();
    userEvent.click(psychicBtn);
    const psychicPokemons = pokemons.filter((pokemon) => pokemon.type === 'Psychic');
    const nextBtn = getByRole('button', { name: nextPokemon });
    for (let index = 0; index < psychicPokemons.length; index += 1) {
      const pokemonName = getByText(psychicPokemons[index].name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextBtn);
    }
    const firstPokemonName = getByText(psychicPokemons[0].name);
    expect(firstPokemonName).toBeInTheDocument();
  });
  it('Testa o botão de filtro "Normal"', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </BrowserRouter>,
    );
    const normalBtn = getByRole('button', { name: 'Normal' });
    expect(normalBtn).toBeInTheDocument();
    userEvent.click(normalBtn);
    const normalPokemons = pokemons.filter((pokemon) => pokemon.type === 'Normal');
    const nextBtn = getByRole('button', { name: nextPokemon });
    for (let index = 0; index < normalPokemons.length; index += 1) {
      const pokemonName = getByText(normalPokemons[index].name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextBtn);
    }
    const firstPokemonName = getByText(normalPokemons[0].name);
    expect(firstPokemonName).toBeInTheDocument();
  });
  it('Testa o botão de filtro "Dragon"', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </BrowserRouter>,
    );
    const dragonBtn = getByRole('button', { name: 'Dragon' });
    expect(dragonBtn).toBeInTheDocument();
    userEvent.click(dragonBtn);
    const dragonPokemons = pokemons.filter((pokemon) => pokemon.type === 'Dragon');
    const nextBtn = getByRole('button', { name: nextPokemon });
    for (let index = 0; index < dragonPokemons.length; index += 1) {
      const pokemonName = getByText(dragonPokemons[index].name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextBtn);
    }
    const firstPokemonName = getByText(dragonPokemons[0].name);
    expect(firstPokemonName).toBeInTheDocument();
  });
});

describe('testa os botões em geral', () => {
  it('testa o botão all', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </BrowserRouter>,
    );
    const allBtn = getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    const nextBtn = getByRole('button', {
      name: nextPokemon,
    });
    expect(nextBtn).toBeInTheDocument();
    for (let index = 0; index < pokemons.length; index += 1) {
      const pokemonName = getByText(pokemons[index].name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextBtn);
    }
    const firstPokemonName = getByText(pokemons[0].name);
    expect(firstPokemonName).toBeInTheDocument();
  });
  it('testa se os botões são criados dinâmicamente', () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />
      </BrowserRouter>,
    );
    const myButtons = getAllByTestId('pokemon-type-button');
    const allTypes = ['Fire', 'Psychic', 'Electric', 'Bug', 'Poison', 'Dragon', 'Normal'];
    expect(myButtons.length).toBe(allTypes.length);
  });
});
