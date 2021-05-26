import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('card is render with pokemoj info', () => {
  const { getByAltText, getByTestId } = renderWithRouter(<App />);
  const pokeName = getByTestId('pokemon-name');
  const pokeType = getByTestId('pokemon-type');
  const pokeWeight = getByTestId('pokemon-weight');
  const pokeSprite = getByAltText('Pikachu sprite');

  expect(pokeName).toHaveTextContent('Pikachu');
  expect(pokeType).toHaveTextContent('Electric');
  expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');
  expect(pokeSprite).toHaveAttribute('src',
    'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('card has a nav link that shows pokemon details', () => {
  const { getByText } = renderWithRouter(<App />);
  const details = getByText(/More details/i);

  expect(details).toHaveAttribute('href', '/pokemons/25');
});

test('nav link redirect to pokemon details page', () => {
  const { getByText } = renderWithRouter(<App />);
  const btnDetail = getByText(/More details/i);
  userEvent.click(btnDetail);
  const pikachuDetail = getByText(/Pikachu Details/i);
  expect(pikachuDetail).toBeInTheDocument();
});

test('URL changes to pokemon/<id> of the pokemon', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const btnDetail = getByText(/More details/i);
  userEvent.click(btnDetail);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('if there is a star icon', () => {
  const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);
  const btnDetail = getByText(/More details/i);
  userEvent.click(btnDetail);
  const favoriteBtn = getByLabelText(/Pokémon favoritado?/i);
  userEvent.click(favoriteBtn);
  const pikachuFavorite = getByAltText(/Pikachu is marked as favorite/i);
  expect(pikachuFavorite).toHaveAttribute('src', '/star-icon.svg');
});
