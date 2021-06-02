import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing Pokedex component', () => {
  it('have a h2 with text Encountered Pokémons', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const heading2 = getAllByRole('heading', {
      Name: /Encauntered pokémons/i,
    });
    expect(heading2[1]).toHaveTextContent('Encountered pokémons');
  });
  it('when click the button the next Pokémon is shown', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const buttonNextPokemon = getByTestId('next-pokemon');
    userEvent.click(buttonNextPokemon);
    expect(buttonNextPokemon).toHaveTextContent('Próximo pokémon');
  });
  it('if have button to reset type of pokemons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const resetButton = getByRole('button', {
      name: /All/i,
    });
    userEvent.click(resetButton);
    expect(resetButton).toBeInTheDocument();
  });

  it('have buttons for each type of pokemons', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttonForType = getAllByTestId('pokemon-type-button');
    userEvent.type(buttonForType);
    expect(buttonForType[1]).toHaveTextContent('Fire');
  });
});
