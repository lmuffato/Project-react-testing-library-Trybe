import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

import data from '../data';

describe('Tests for the <Pokedex> component', () => {
  test('page contains an h2 heading with the text "Encountered Pokémon"', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  describe(`Next Pokémon in the list is displayed when the Next
    Pokémon button is clicked.`, () => {
    test('The button should contain the text "Próximo pokémon"', () => {
      const { getByTestId, getByText } = render(
        <MemoryRouter initialEntries={ ['/'] }>
          <App />
        </MemoryRouter>,
      );
      const button = getByTestId('next-pokemon');
      expect(button).toBeInTheDocument();

      const text = getByText(/Próximo pokémon/i);
      expect(text).toBeInTheDocument();
    });

    test('there must be an "All" button', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={ ['/'] }>
          <App />
        </MemoryRouter>,
      );
      const allFilterButton = getByText(/all/i);
      expect(allFilterButton).toBeDefined();
    });

    test('there must be filter buttons by Category', () => {
      const { getAllByTestId } = render(
        <MemoryRouter initialEntries={ ['/'] }>
          <App />
        </MemoryRouter>,
      );
      const button = getAllByTestId('pokemon-type-button');
      expect(button).toBeDefined();
    });

    test('check if there is a button for each category and the "All"', () => {
      const { getAllByRole } = renderWithRouter(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const length = 7;
      const types = ['All', ...new Set(data.map((p) => p.type))];
      expect(types.length).toBe(length + 1);

      types.forEach((type) => {
        const typeCaseInsensitive = new RegExp(type, 'i');
        const button = getAllByRole('button', { name: typeCaseInsensitive });

        expect(button.length).toBe(1);
        expect(button[0]).toBeInTheDocument();
        expect(button[0]).toHaveTextContent(typeCaseInsensitive);
      });
    });

    test('tests if the filter buttons reset work correctly', () => {
      const { getByRole, getByTestId } = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const buttonAll = getByRole('button', { name: 'All' });

      const nextPokemon = getByRole('button', { name: /próximo pokémon/i });

      let cur;
      data.forEach((pokemon) => {
        cur = getByTestId('pokemon-name');
        expect(cur).toHaveTextContent(pokemon.name);
        userEvent.click(nextPokemon);
      });

      userEvent.click(buttonAll);
    });
  });
});
