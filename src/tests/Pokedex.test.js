import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Test Pokedex', () => {
  test('shows the Pokédex title', () => {
    const { getByRole } = renderWithRouter(<App />);

    const title = getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });

    expect(title).toBeInTheDocument();
  });
  test('shows the next pokemon when the button is clicked', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const pokemon1 = getByText(/pikachu/i);
    expect(pokemon1).toBeInTheDocument();

    const nextButton = getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(nextButton);

    const pokemon2 = getByText(/charmander/i);
    expect(pokemon2).toBeInTheDocument();
  });
  test('shows the filter buttons', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);

    const buttons = getAllByTestId('pokemon-type-button');
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });

    const eleButton = getByRole('button', { name: /electric/i });
    expect(eleButton).toHaveTextContent('Electric');

    const firButton = getByRole('button', { name: /fire/i });
    expect(firButton).toHaveTextContent('Fire');

    const bugButton = getByRole('button', { name: /bug/i });
    expect(bugButton).toHaveTextContent('Bug');

    const poiButton = getByRole('button', { name: /poison/i });
    expect(poiButton).toHaveTextContent('Poison');

    const psyButton = getByRole('button', { name: /psychic/i });
    expect(psyButton).toHaveTextContent('Psychic');

    const norButton = getByRole('button', { name: /normal/i });
    expect(norButton).toHaveTextContent('Normal');

    const draButton = getByRole('button', { name: /dragon/i });
    expect(draButton).toHaveTextContent('Dragon');
  });
  test('shows the all button', () => {
    const { getByRole } = renderWithRouter(<App />);

    const allButton = getByRole('button', {
      name: /all/i,
    });

    expect(allButton).toBeInTheDocument();
  });
});
