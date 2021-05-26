import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa <Pokedex.js />', () => {
  it('Testa se renderiza um cabeçalho h2 com o texto `Encountered pokémons`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2 = getByRole('heading', { 
      name: /Encountered pokémons/i 
    });
    expect(h2).toBeInTheDocument();
  });

  it('Testa se contem um botão com o texto `Próximo pokémon`', () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText(/Próximo pokémon/i);
    expect(button).toBeInTheDocument();
  });

  // Souce: https://github.com/tryber/sd-09-project-react-testing-library/tree/fernandacajueiro-rtl
  it('Testa se renderiza apenas um Pokémon por vez e retornar ao primeiro', () => {
    const { getByText, getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const button = getByText(/Próximo pokémon/i);
    pokemons.forEach(() => {
      const pokemonNames = getAllByTestId('pokemon-name');
      const pokemonName = getByTestId('pokemon-name');
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(button);
      expect(pokemonNames).toHaveLength(1);
    });
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  // Souce: https://github.com/tryber/sd-09-project-react-testing-library/tree/fernandacajueiro-rtl
  it('Testa se contem um botão de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typeButtons = getAllByTestId('pokemon-type-button');
    types.forEach((type, index) => {
      expect(typeButtons[index]).toHaveTextContent(type);
    });
  });

  // Souce: https://github.com/tryber/sd-09-project-react-testing-library/tree/fernandacajueiro-rtl
  it('Testa se contem um botão de filtros', () => {
    const { getByText } = renderWithRouter(<App />);
    const reset = getByText(/All/i);
    expect(reset).toBeInTheDocument();
    userEvent.click(reset);
    const next = getByText(/Próximo pokémon/i);
    userEvent.click(next);
    expect(getByText(/Charmander/i)).toBeInTheDocument();
  });

  // Souce: https://github.com/tryber/sd-09-project-react-testing-library/tree/fernandacajueiro-rtl
  it('Testa se não renderiza o botão `Próximo pokémon` quando houver apenas um pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const next = getByText(/Próximo pokémon/i);
    const poison = getByText(/Poison/i);
    expect(poison).toBeInTheDocument();
    userEvent.click(poison);
    expect(next.disabled).toBeTruthy();
  });
});