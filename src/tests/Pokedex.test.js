import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import App from '../App';

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
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const button = getByTestId('next-pokemon');
      expect(button).toBeInTheDocument();

      const text = getByText(/Próximo pokémon/i);
      expect(text).toBeInTheDocument();
    });
  });
});
