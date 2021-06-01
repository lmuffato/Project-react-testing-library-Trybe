import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testando o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista'
  + 'quando o botão Próximo é clicado.', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(button).toBeInTheDocument();

    const proximoPokemon = screen.getByTestId('next-pokemon');
    expect(proximoPokemon).toHaveTextContent(/Próximo pokémon/i);
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', {
      name: /All/i,
    });
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    const dataTestidPokemon = screen.getByTestId('pokemon-name');
    const dataTestidButton = screen.getByTestId('next-pokemon');

    pokemons.forEach((pokemon) => {
      expect(dataTestidPokemon).toHaveTextContent(pokemon.name);
      userEvent.click(dataTestidButton);
    });
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonType = screen.getAllByTestId('pokemon-type-button');
    const filterTypes = 7;
    expect(buttonType.length).toBe(filterTypes);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    for (let index = 0; index < filterTypes; index += 1) {
      expect(buttonType[index]).toHaveTextContent(types[index]);
    }
  });
});
