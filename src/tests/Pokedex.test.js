import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('test the component composition', () => {
  const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

  it('if there is a h2 heading', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      level: 2,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  it('if the use of next button', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } />
      </App>,
    );
    const button = getByTestId('next-pokemon');
    expect(button).toHaveTextContent('Próximo pokémon');
    userEvent.click(button);
    const pokemon = getByText('Charmander');
    expect(pokemon).toBeInTheDocument();
    userEvent.click(button);
    expect(pokemon).not.toHaveTextContent('Charmander');
  });

  it('test the filter buttons', () => {
    const { getAllByTestId, getByTestId, getByText } = renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } />
      </App>,
    );
    const buttons = getAllByTestId('pokemon-type-button');
    expect(buttons[0]).toHaveTextContent('Electric');
    userEvent.click(buttons[0]);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    userEvent.click(buttons[1]);
    expect(pokemonName).toHaveTextContent('Charmander');
    const resetButton = getByText('All');
    userEvent.click(resetButton);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  it('test the creation of the filters', () => {
    const { getAllByTestId } = renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } />
      </App>,
    );
    const buttons = getAllByTestId('pokemon-type-button');
    buttons.forEach((element, index) => {
      expect(element).toHaveTextContent(types[index]);
    });
  });
});
