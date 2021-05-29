import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Test App', () => {
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
});
