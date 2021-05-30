import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithHistory';
import App from '../App';

describe('Testes do Component Pokedex.js', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByRole } = renderWithRouter(<App />);

    expect(getByRole('heading', {
      name: /encountered pokémons/i,
    })).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const nextPokemonButton = getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(nextPokemonButton);

    expect(getByText(/Charmander/i)).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    const { getByRole } = renderWithRouter(<App />);
    const moreLink = getByRole('link', {
      name: /more details/i,
    });

    expect(moreLink.length).not.toBe(2);
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: /Bug/i,
    });

    userEvent.click(button);

    expect(getByText(/Caterpie/i)).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: /All/i,
    });

    userEvent.click(button);

    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('Testa se é criado um botão de filtro para cada tipo de Pokémon.', () => {
    const { getByRole, getByText, getAllByTestId } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: /Electric/i,
    });

    userEvent.click(button);

    expect(getByText(/Pikachu/i)).toBeInTheDocument();

    const button2 = getByRole('button', {
      name: /Fire/i,
    });

    userEvent.click(button2);

    expect(getByText(/Charmander/i)).toBeInTheDocument();

    const button3 = getByRole('button', {
      name: /Bug/i,
    });

    userEvent.click(button3);

    expect(getByText(/Caterpie/i)).toBeInTheDocument();

    const button4 = getByRole('button', {
      name: /Poison/i,
    });

    userEvent.click(button4);

    expect(getByText(/Ekans/i)).toBeInTheDocument();

    const button5 = getByRole('button', {
      name: /Psychic/i,
    });

    userEvent.click(button5);

    expect(getByText(/Alakazam/i)).toBeInTheDocument();

    const button6 = getByRole('button', {
      name: /Normal/i,
    });

    userEvent.click(button6);

    expect(getByText(/Snorlax/i)).toBeInTheDocument();

    const button7 = getByRole('button', {
      name: /Dragon/i,
    });

    userEvent.click(button7);

    expect(getByText(/Dragonair/i)).toBeInTheDocument();

    // essa parte foi feito com a ajuda do Anderson Nascimento
    // o toBeTruthy retorna um bolleano quando o botão tiver ativo ele retorna verdadeiro
    const allBtns = getAllByTestId('pokemon-type-button');
    const nextPokemon = getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(allBtns[0]);
    expect(nextPokemon.disabled).toBeTruthy();

    userEvent.click(allBtns[2]);
    expect(nextPokemon.disabled).toBeTruthy();

    userEvent.click(allBtns[3]);
    expect(nextPokemon.disabled).toBeTruthy();

    userEvent.click(allBtns[5]);
    expect(nextPokemon.disabled).toBeTruthy();

    userEvent.click(allBtns[6]);
    expect(nextPokemon.disabled).toBeTruthy();
  });
});
