import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('tests `Pokedex` component ', () => {
  test('contains a <h2> element with `Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  test('contains a button with the text `Próximo pokémon`', () => {
    renderWithRouter(<App />);
    const buttonText = screen.getByTestId('next-pokemon');
    expect(buttonText).toHaveTextContent(`Próximo pokémon`);
  });

  test('contains pokemon type buttons', () => {
    renderWithRouter(<App />);
    const buttonType = screen.getAllByTestId('pokemon-type-button');
    expect(buttonType[1]).toHaveTextContent(`Fire`);
  });

  test('have reset pokemon type button', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(resetButton);
    expect(resetButton).toBeInTheDocument();
  });
});
