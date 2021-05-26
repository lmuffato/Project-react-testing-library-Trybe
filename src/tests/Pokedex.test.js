import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testing the component "Pokedex"', () => {
  it('renders a reading with the text "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });

  it('render the next Pokémon when the "Próximo pokémon" button is clicked', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    const nextPokemon = getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
  });

  it('', () => {
    const { getByRole } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', {
      name: /all/i,
    });

    userEvent.click(buttonAll);
  //   expect(buttonAll).toHaveLength/(8);
  });
});
