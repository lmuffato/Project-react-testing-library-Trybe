import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requirement 5 - testing the <Pokedex/> component', () => {
  it('Test click event on the button that containes the text "All"', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const btnAll = getByRole('button', { name: 'All' });
    fireEvent.click(btnAll);
    const pokereset = getByTestId('pokemon-name');
    expect(pokereset).toHaveTextContent(/pikachu/i);
  });

  it('Check the title "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const title = getByRole('heading', { name: 'Encountered pokémons' });
    expect(title.innerHTML).toBe('Encountered pokémons');
  });

  it('Test that the "All" contains the text "All" as a value', () => {
    const { getByRole } = renderWithRouter(<App />);
    const btnAll = getByRole('button', { name: 'All' });
    expect(btnAll.innerHTML).toBe('All');
  });

  it('Check if the pokemon type buttons have the id "pokemon-type-button"', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const btns = getAllByTestId('pokemon-type-button')[0].textContent;
    expect(btns).toBe('Electric');
  });

  it('Test that the "Próximo pokémon"'
     + 'contains the text "Próximo pokémon" as a value', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const btn = getByTestId('next-pokemon').textContent;
    expect(btn).toBe('Próximo pokémon');
  });
});
