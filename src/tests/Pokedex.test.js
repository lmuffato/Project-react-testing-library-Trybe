import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const headingH2 = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();
  });

  it('Exibir o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    const proxPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(proxPokemon);
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent('Charmander');

    userEvent.click(proxPokemon);
    const nextPokemon = screen.getByTestId('pokemon-name');
    expect(nextPokemon).toHaveTextContent('Caterpie');
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const typePokemon = screen.getByRole('button', {
      name: /electric/i,
    });
    userEvent.click(typePokemon);
    const typePokemonFilter = screen.getByTestId('pokemon-type');
    expect(typePokemonFilter).toHaveTextContent('Electric');
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonReset = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(buttonReset);
    const PokemonReset = screen.getByTestId('pokemon-type');
    expect(PokemonReset).toHaveTextContent('Electric');
  });

  it('Teste se é criado, um botão de filtro para cada tipo de Pokémon', () => {
    renderWithRouter(<App />);
    const buttonsFilter = screen.getAllByTestId('pokemon-type-button');

    expect(buttonsFilter[0]).toHaveTextContent('Electric');
    expect(buttonsFilter[1]).toHaveTextContent('Fire');
    expect(buttonsFilter[2]).toHaveTextContent('Bug');
    expect(buttonsFilter[3]).toHaveTextContent('Poison');
    expect(buttonsFilter[4]).toHaveTextContent('Psychic');
    expect(buttonsFilter[5]).toHaveTextContent('Normal');
    expect(buttonsFilter[6]).toHaveTextContent('Dragon');
  });
});
