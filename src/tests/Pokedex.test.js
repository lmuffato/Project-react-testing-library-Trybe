import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requirement 5', () => {
  test('If the page has a h2 with the text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(
      <App />,
    );
    const h2 = getByRole('heading',
      { name: /encountered pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test(
    'If the next pokémon is shown when the button "Próximo pokémon" is clicked', () => {
      const { getByText, getByTestId } = renderWithRouter(
        <App />,
      );
      const pikachu = getByText('Pikachu');
      expect(pikachu).toBeInTheDocument();
      const nextButton = getByTestId('next-pokemon');
      userEvent.click(nextButton);
      expect(nextButton).toHaveTextContent('Próximo pokémon');
      const charmander = getByText('Charmander');
      expect(charmander).toBeInTheDocument();
    },
  );

  test('If the Pokédex has filter buttons', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <App />,
    );
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const filterButton = getAllByTestId('pokemon-type-button');
    expect(filterButton[1]).toHaveTextContent('Fire');
  });

  test('If the Pokédex has reset filter button', () => {
    const { getByText, getByRole } = renderWithRouter(
      <App />,
    );
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const allButton = getByRole('button', { name: 'All' });
    userEvent.click(allButton);
    expect(pikachu).toBeInTheDocument();
  });
});
