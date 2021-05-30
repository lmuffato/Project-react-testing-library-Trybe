import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

describe('Test component <Pokedex />', () => {
  test('Test page heading', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/');
    const encounteredPkms = getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(encounteredPkms).toBeInTheDocument();
  });

  test('Test only one pokemon and next button', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    expect(screen.getByText('Próximo pokémon')).toBeInTheDocument();
    const pkmName = screen.getByTestId('pokemon-name');
    expect(pkmName).toBeInTheDocument();
    expect(pkmName.innerHTML).toBe(pokemons[0].name);
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName).toHaveLength(1);
    const pkmType = screen.getByTestId('pokemon-type');
    expect(pkmType).toBeInTheDocument();
    const pokemonType = screen.getAllByTestId('pokemon-type');
    expect(pokemonType).toHaveLength(1);
    const pkmWeight = screen.getByTestId('pokemon-weight');
    expect(pkmWeight).toBeInTheDocument();
    const pokemonWeight = screen.getAllByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveLength(1);
    userEvent.click(screen.getByTestId('next-pokemon'));
    expect(pkmName.innerHTML).toBe(pokemons[1].name);
  });

  test('Test filter buttons', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const pkmListOfTypes = [...new Set(pokemons.map(({ type }) => type))];
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons).toHaveLength(pkmListOfTypes.length);
    pkmListOfTypes.forEach((type, index) => {
      expect(buttons[index]).toHaveTextContent(type);
    });
  });

  test('Test reset button', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    history.push('/');
    const reset = getByRole('button', {
      name: /all/i,
    });
    expect(reset).toBeInTheDocument();
    userEvent.click(reset);
    history.push('/');
    expect(reset).not.toBeDisabled();
  });
});

// Testes elaborados com base no PR da aluna Ana Ventura (https://github.com/tryber/sd-010-a-project-react-testing-library/pull/3/files)
