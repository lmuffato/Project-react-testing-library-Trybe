import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

const arrayTipoPokemons = [
  'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

const proximoPokemon = 'Próximo pokémon';
const proximoClick = (getByText) => {
  data.forEach(({ name }) => {
    const botaoProximo = getByText(proximoPokemon);
    expect(getByText(name)).toBeInTheDocument();
    userEvent.click(botaoProximo);
  });
};

describe('Pokedex.js', () => {
  it('testing Pokedex', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const titleText = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(titleText).toBeInTheDocument();
    const botaoProximo = getByText(proximoPokemon);
    expect(botaoProximo).toBeInTheDocument();
    userEvent.click(botaoProximo);
  });

  it('testing click in button', () => {
    const { getByText } = renderWithRouter(<App />);
    proximoClick(getByText);
  });

  it('click in last podemon, show first pokemom', () => {
    const { getByText } = renderWithRouter(<App />);
    const botaoProximo = getByText(proximoPokemon);
    data.forEach(() => userEvent.click(botaoProximo));
    expect(getByText(data[0].name)).toBeInTheDocument();
  });

  it('pokedex should display only one pokemon at a time', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const imagePokemon = getAllByRole('img');
    expect(imagePokemon.length).toBe(1);
  });

  it('The Pokédex must contain filter buttons', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    arrayTipoPokemons.forEach((type, index) => {
      const botao = getAllByTestId('pokemon-type-button')[index];
      expect(botao).toHaveTextContent(type);
    });
  });

  it('testing filtered button', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const botaoProximo = getByText(proximoPokemon);
    arrayTipoPokemons.forEach((type, index) => {
      const botao = getAllByTestId('pokemon-type-button')[index];
      userEvent.click(botao);
      const pokemonsFiltrados = data.filter((pokemon) => pokemon.type === type);
      pokemonsFiltrados.forEach((pokemon, _, array) => {
        expect(getByText(pokemon.name)).toBeInTheDocument();
        if (array.length > 1) userEvent.click(botaoProximo);
      });
    });
  });

  it('testing button All', () => {
    const { getByText } = renderWithRouter(<App />);
    const botaoAll = getByText('All');
    expect(botaoAll).toBeInTheDocument();
    userEvent.click(botaoAll);
    proximoClick(getByText);
    expect(getByText(data[0].name)).toBeInTheDocument();
  });

  it('buttons filtered and disable button nextPodemom', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    arrayTipoPokemons.forEach((type) => {
      const botao = getAllByText(type)[1] || getByText(type);
      expect(botao).toBeInTheDocument();
      const botaoProximo = getByText(proximoPokemon);
      const pokemonsUnicos = ['Bug', 'Electric', 'Poison', 'Normal'];
      pokemonsUnicos.forEach((tipo) => {
        const tipoPokemon = getByText(tipo);
        userEvent.click(tipoPokemon);
        expect(botaoProximo).toBeDisabled();
      });
    });
  });
});
