import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('tests on Pokemon component', () => {
  const firstPokemon = pokemons[0];

  test('renders Pokemon informations', () => {
    renderWithRouter(<App />);

    expect(screen.getByText(firstPokemon.name)).toBeInTheDocument();

    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(pokemons[0].type);

    const { averageWeight: { value, measurementUnit } } = firstPokemon;

    expect(screen.getByText(/average weight/i)).toHaveTextContent(value);
    expect(screen.getByText(/average weight/i)).toHaveTextContent(measurementUnit);

    expect(screen.getByRole('img').src).toBe(firstPokemon.image);
    expect(screen.getByRole('img').alt).toBe(`${firstPokemon.name} sprite`);
  });

  test('renders a link for more details and the path has pokemon id', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByText(/more details/i);

    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);
    history.push(`/pokemons${firstPokemon.id}`);

    expect(history.location.pathname).toMatch(`/pokemons${firstPokemon.id}`);
  });

  test('favoritaded pokemons have star icons', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByText('More details'));
    userEvent.click(screen.getByRole('checkbox'));

    expect(screen
      .getByAltText(`${firstPokemon.name} is marked as favorite`).src)
      .toMatch('/star-icon.svg');
  });
});
