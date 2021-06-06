import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('tests Pokedex.js', () => {
  test('verifies if the page renders the heading "Encoutered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const expectedHeading = getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(expectedHeading).toBeInTheDocument();
  });

  test('verifies if the button "Proximo pokémon" is redered', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const btnText = getByTestId('next-pokemon');
    expect(btnText).toHaveTextContent(/Próximo pokémon/);
  });

  test('verifies if there are filter buttons', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const btnType = getAllByTestId('pokemon-type-button');
    expect(btnType[1]).toHaveTextContent(/Fire/);
  });

  test('verifies if there is a reset button', () => {
    const { getByRole } = renderWithRouter(<App />);
    const resetBtn = getByRole('button', {
      name: /All/i,
    });
    userEvent.click(resetBtn);
    expect(resetBtn).toBeInTheDocument();
  });
});
