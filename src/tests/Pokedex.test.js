import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const buttonLength = 7;

it('renders a "home" page with the text "encountered pokémons"', () => {
  const { getByRole } = renderWithRouter(<App />);
  const home = getByRole('heading', { name: /encountered pokémons/i, level: 2 });
  expect(home).toBeInTheDocument();
});

it('should render the next pokemon when click on button "Próximo pokémon"', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const buttonNext = getByRole('button', { name: /próximo pokémon/i });
  userEvent.click(buttonNext);
  const charmander = getByText('Charmander');

  expect(buttonNext).toBeInTheDocument();
  expect(charmander).toBeInTheDocument();
});

it('should render the type pokemon when click on button "type-name"', () => {
  const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
  const buttonType = getAllByTestId('pokemon-type-button');
  userEvent.click(buttonType[0]);
  const electric = getByTestId('pokemon-type');
  expect(electric).toBeInTheDocument();
});

it('should render all the pokemons when click on button "all"', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const buttonAll = getByRole('button', { name: /all/i });
  userEvent.click(buttonAll);
  const pikachu = getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
});

it('should render one "type-pokemon" button', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const buttonType = getAllByTestId('pokemon-type-button');
  expect(buttonType).toHaveLength(buttonLength);
  expect(buttonType[0].textContent).toBe('Electric');
  expect(buttonType[1].textContent).toBe('Fire');
  expect(buttonType[2].textContent).toBe('Bug');
  expect(buttonType[3].textContent).toBe('Poison');
  expect(buttonType[4].textContent).toBe('Psychic');
  expect(buttonType[5].textContent).toBe('Normal');
  expect(buttonType[6].textContent).toBe('Dragon');
});
