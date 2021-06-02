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
});
