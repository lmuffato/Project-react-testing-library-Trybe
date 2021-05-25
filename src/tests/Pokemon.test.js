import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('pokemon card', () => {
  const { getByRole, history, getByText, getByAltText } = renderWithRouter(<App />);

  const pokemonName = screen.getByTestId('pokemon-name');
  const pokemonType = screen.getByTestId('pokemon-type');
  const pokemonWeight = screen.getByTestId('pokemon-weight');
  const pokemonImg = getByAltText('Pikachu sprite');
  const detailsLink = getByRole('link', {
    name: 'More details',
  });
  const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
  expect(pokemonName.textContent).toBe('Pikachu');
  expect(pokemonType).toHaveTextContent('Electric');
  expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  expect(pokemonImg.src).toBe(url);

  userEvent.click(detailsLink);
  const { location: { pathname } } = history;

  expect(pathname).toBe('/pokemons/25');

  const pikachuSummary = getByText('This intelligent Pokémon roasts hard'
    + ' berries with electricity to make them tender enough to eat.');

  expect(pikachuSummary).toBeInTheDocument();

  const pikachuCheckBox = getByRole('checkbox', {
    name: 'Pokémon favoritado?',
  });

  userEvent.click(pikachuCheckBox);

  const favoriteIcon = getByAltText('Pikachu is marked as favorite');
  expect(favoriteIcon.src).toContain('/star-icon.svg');
});
