import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Teste pokedex', () => {
  it('test if the page shows "Encoutered pokémon', () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ false }
    />);
    const enconteredText = getByText('Encountered pokémons');
    expect(enconteredText).toBeInTheDocument();
  });
  it('test if shows the next pokemon when "Próximo pokémon" button is clicked'
  + ' and the first one when in the last pokemon', () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ false }
    />);
    const nextPokemonBtn = getByText(/Próximo pokémon/i);
    userEvent.click(nextPokemonBtn);
    const secondPokemon = getByText(/Charmander/i);
    expect(secondPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    const thirdPokemon = getByText(/Caterpie/i);
    expect(thirdPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    const fourthPokemon = getByText(/Ekans/i);
    expect(fourthPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    const fifthPokemon = getByText(/Alakazam/i);
    expect(fifthPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    const sixthPokemon = getByText(/Mew/i);
    expect(sixthPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    const seventhPokemon = getByText(/Rapidash/i);
    expect(seventhPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    const eighthPokemon = getByText(/Snorlax/i);
    expect(eighthPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    const ninthPokemon = getByText(/Dragonair/i);
    expect(ninthPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    const firstPokemon = getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('test if only shows one pokemon at a time', () => {
    const { getAllByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ false }
    />);
    const pokemonImg = getAllByRole('img');
    expect(pokemonImg.length).toBe(1);
  });
  it('test if shows the right pokemon element when click on elements button', () => {
    const { getByRole, getAllByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ false }
    />);
    const eletric = getByRole('button', { name: /Electric/i });
    userEvent.click(eletric);
    const eletricText = getAllByText(/electric/i);
    expect(eletricText.length).toBe(2);

    const fire = getByRole('button', { name: /fire/i });
    userEvent.click(fire);
    const fireText = getAllByText(/fire/i);
    expect(fireText.length).toBe(2);

    const bug = getByRole('button', { name: /bug/i });
    userEvent.click(bug);
    const bugText = getAllByText(/bug/i);
    expect(bugText.length).toBe(2);

    const poison = getByRole('button', { name: /poison/i });
    userEvent.click(poison);
    const poisonText = getAllByText(/poison/i);
    expect(poisonText.length).toBe(2);

    const psychic = getByRole('button', { name: /psychic/i });
    userEvent.click(psychic);
    const psychicText = getAllByText(/psychic/i);
    expect(psychicText.length).toBe(2);

    const normal = getByRole('button', { name: /normal/i });
    userEvent.click(normal);
    const normalText = getAllByText(/normal/i);
    expect(normalText.length).toBe(2);

    const dragon = getByRole('button', { name: /dragon/i });
    userEvent.click(dragon);
    const dragonText = getAllByText('Dragon');
    expect(dragonText.length).toBe(2);
  });
  it('test if the all button works', () => {
    const { getByText, getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ false }
    />);
    const normal = getByRole('button', { name: /normal/i });
    userEvent.click(normal);

    const allBtn = getByRole('button', { name: /all/i });
    userEvent.click(allBtn);

    const nextPokemonBtn = getByText(/Próximo pokémon/i);
    userEvent.click(nextPokemonBtn);
    const secondPokemon = getByText(/Charmander/i);
    expect(secondPokemon).toBeInTheDocument();
  });
  it('test if there`s only one pokemon filtered'
  + ' the "Próximo pokémon" button is disable', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ false }
    />);
    const bug = getByRole('button', { name: /bug/i });
    userEvent.click(bug);
    const nextPokemonBtn = getByText(/Próximo pokémon/i);
    expect(nextPokemonBtn).toBeDisabled();
  });
  it('test if theres 7 pokemons types filters', () => {
    const numberOfFilters = 7;
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ false }
    />);
    const filterBtns = getAllByTestId('pokemon-type-button');
    expect(filterBtns.length).toBe(numberOfFilters);
  });
});
