import React from 'react';
// import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { BrowserRouter } from 'react-router-dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testing App components', () => {
  it('renders a reading with the text `encoutered pokémons`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('verify the name of a button on the page', () => {
    const { getByRole } = renderWithRouter(<App />);
    const nextPokemon = getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(nextPokemon);
  });

  // it('verify the name of a filter button on the page', () => {
  //   const { getByTestId } = renderWithRouter(<App />);
  //   const nextPokemon = getByTestId('pokemon-type-button', {
  //   });
  //   userEvent.click(nextPokemon);
  // });
});
