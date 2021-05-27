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

  // it('show one pokemon at a time', () => {
  //   renderWithRouter(<App />);
  //   const validation = document.querySelector('a');
  //   expect(validation).toHaveAttribute('a', 'More details');
  // });

  it('check for filter buttons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const filterBtn = (btn) => getByRole('button', { name: `${btn}` });
    const btnAll = filterBtn('All');
    const btnElectric = filterBtn('Electric');
    const btnFire = filterBtn('Fire');
    const btnBug = filterBtn('Bug');
    const btnPoison = filterBtn('Poison');
    const btnPsychic = filterBtn('Psychic');
    const btnNormal = filterBtn('Normal');
    const btnDragon = filterBtn('Dragon');

    expect(btnAll).toBeInTheDocument();
    expect(btnElectric).toBeInTheDocument();
    expect(btnFire).toBeInTheDocument();
    expect(btnBug).toBeInTheDocument();
    expect(btnPoison).toBeInTheDocument();
    expect(btnPsychic).toBeInTheDocument();
    expect(btnNormal).toBeInTheDocument();
    expect(btnDragon).toBeInTheDocument();
  });

  it('check if the Pokédex contains a button to reset the filter', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', {
      name: /all/i,
    });

    userEvent.click(buttonAll);
    const firstPokemon = getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });

  it('shows the filter buttons dynamically', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const filterButtons = getAllByTestId('pokemon-type-button');
    const seven = 7;
    expect(filterButtons).toHaveLength(seven);
  });
});
