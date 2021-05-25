import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Data from '../data';

const btnNext = 'Próximo pokémon';

it('contains h2 with the following text "Encountered pokémons"', () => {
  const { getByRole } = renderWithRouter(<App />);

  const h2 = getByRole('heading', {
    name: 'Encountered pokémons',
    level: 2,
  });

  expect(h2).toBeInTheDocument();
});

test('next button', () => {
  const { getByRole } = renderWithRouter(<App />);

  const nextButton = getByRole('button', {
    name: btnNext,
  });
  expect(nextButton).toBeInTheDocument();

  userEvent.click(nextButton);

  expect(screen.getByText('Charmander')).toBeInTheDocument();

  for (let index = 0; index < Data.length - 1; index += 1) {
    userEvent.click(nextButton);
  }

  expect(screen.queryByText('Dragonair')).not.toBeInTheDocument();
  expect(screen.getByText('Pikachu')).toBeInTheDocument();
  expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
});

test('filter options', () => {
  const { getByRole } = renderWithRouter(<App />);

  const psychicTypeButton = getByRole('button', {
    name: 'Psychic',
  });

  userEvent.click(psychicTypeButton);

  const pokemonName = screen.getByTestId('pokemon-name');
  const pokemonType = screen.getByTestId('pokemon-type');

  expect(pokemonName).toHaveTextContent('Alakazam');
  expect(pokemonType).toHaveTextContent('Psychic');

  const nextButton = getByRole('button', {
    name: btnNext,
  });
  expect(nextButton).toBeInTheDocument();

  userEvent.click(nextButton);

  expect(pokemonName).toHaveTextContent('Mew');
  expect(pokemonType).toHaveTextContent('Psychic');

  userEvent.click(nextButton);

  expect(pokemonName).toHaveTextContent('Alakazam');
  expect(pokemonType).toHaveTextContent('Psychic');
});

test('filter "All" exists', () => {
  const { getByRole } = renderWithRouter(<App />);

  const buttonAll = getByRole('button', {
    name: 'All',
  });
  expect(buttonAll).toBeInTheDocument();

  const buttonNext = getByRole('button', {
    name: btnNext,
  });

  userEvent.click(buttonAll);
  expect(screen.getByText('Pikachu')).toBeInTheDocument();
  userEvent.click(buttonNext);
  expect(screen.getByText('Charmander')).toBeInTheDocument();
  userEvent.click(buttonNext);
  expect(screen.getByText('Caterpie')).toBeInTheDocument();
});

it('page loads with no filters selected', () => {
  const { getByRole } = renderWithRouter(<App />);

  const buttonNext = getByRole('button', {
    name: btnNext,
  });

  expect(screen.getByText('Pikachu')).toBeInTheDocument();
  userEvent.click(buttonNext);
  expect(screen.getByText('Charmander')).toBeInTheDocument();
  userEvent.click(buttonNext);
  expect(screen.getByText('Caterpie')).toBeInTheDocument();
});

test('filter buttons for each pokemon type', () => {
  const { getAllByTestId } = renderWithRouter(<App />);

  const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic',
    'Normal', 'Dragon'];
  const filterButtons = getAllByTestId('pokemon-type-button');

  types.forEach((type, index) => {
    expect(filterButtons[index]).toHaveTextContent(type);
  });
});

it('next button disabled if has only 1 pokemon filtered', () => {
  const { getByRole } = renderWithRouter(<App />);

  const bugTypeButton = getByRole('button', {
    name: 'Bug',
  });

  userEvent.click(bugTypeButton);

  const buttonNext = getByRole('button', {
    name: btnNext,
  });

  expect(buttonNext).toBeDisabled();
});
