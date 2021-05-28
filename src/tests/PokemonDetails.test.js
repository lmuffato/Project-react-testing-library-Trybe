import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Test PokemonDetails', () => {
  test('test if the detailed information is shown in the page', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);

    const detButton = getByRole('link', { name: /more details/i });
    expect(detButton).toBeInTheDocument();

    userEvent.click(detButton);

    const name = getByTestId('pokemon-name').innerHTML;

    const details = getByRole('heading', { name: / details/i });
    expect(`${name}+ +${details}`).toBeDefined();

    expect(detButton).not.toBeInTheDocument();

    const summary = getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summary).toBeDefined();

    const paragraph = (summary.nextElementSibling);
    expect(paragraph).toBeDefined();
  });
  test('testing  if maps section is shown in the page', () => {
    const { getByRole, getByTestId, getAllByAltText } = renderWithRouter(<App />);

    const detButton = getByRole('link', { name: /more details/i });
    expect(detButton).toBeInTheDocument();

    userEvent.click(detButton);

    const name = getByTestId('pokemon-name').innerHTML;

    const title = getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    });
    expect(title).toBeDefined();

    const altText = `${name} location`;
    const img = getAllByAltText(altText);
    img.forEach((image) => {
      expect(image.src).toBeDefined();
      expect(image.alt).toBeDefined();
      expect(image.nextElementSibling).toBeDefined();
    });
  });
  test('testing  if an user can favorite a pokemon', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const detButton = getByRole('link', { name: /more details/i });
    expect(detButton).toBeInTheDocument();

    userEvent.click(detButton);

    const favorite = getByText(/pokémon favoritado\?/i);
    expect(favorite).toBeInTheDocument();

    const favoriteCheck = getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favoriteCheck).toBeInTheDocument();
  });
});
