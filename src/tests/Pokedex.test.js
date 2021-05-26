import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do componente Pokedex.js', () => {
  it('Contém um heading H2 com o texto: Encountered pokémons', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Testa o botão Próximo Pokémon', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(nextBtn);

    const secondPokemon = screen.getByText('Charmander');
    expect(secondPokemon).toBeInTheDocument();
  });

  it('Apenas um pokémon é mostrado por vez', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  it('O botão de filtro está funcionando corretamente', () => {
    renderWithRouter(<App />);

    const psychicBtnType = screen.getByRole('button', {
      name: /Psychic/i,
    });
    userEvent.click(psychicBtnType);

    const psychicPokemon = screen.getByText('Alakazam');
    expect(psychicPokemon).toBeInTheDocument();
  });

  it('O botão resetar limpa os filtros', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(allBtn);

    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Possui um botão de filtro para cada tipo de pokémon', () => {
    renderWithRouter(<App />);

    const typeBtn = screen.getAllByTestId('pokemon-type-button');

    expect(typeBtn[0]).toHaveTextContent('Electric');
    expect(typeBtn[1]).toHaveTextContent('Fire');
    expect(typeBtn[2]).toHaveTextContent('Bug');
    expect(typeBtn[3]).toHaveTextContent('Poison');
    expect(typeBtn[4]).toHaveTextContent('Psychic');
    expect(typeBtn[5]).toHaveTextContent('Normal');
    expect(typeBtn[6]).toHaveTextContent('Dragon');
  });

  it('O botão Próximo pokémon é desabilitado quando a lista tiver um só pokémon', () => {
    renderWithRouter(<App />);

    const eletricPokemon = screen.getByRole('button', {
      name: /Electric/i,
    });
    userEvent.click(eletricPokemon);

    const nextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    expect(nextPokemon).toBeDisabled();
  });
});
