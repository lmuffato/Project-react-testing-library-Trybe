import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../components/helper';
import data from '../data';

test('Testa a tela de detalhes', () => {
  const {
    getByRole, getByText, getAllByAltText, history, getByTestId,
  } = renderWithRouter(<App />);
  userEvent.click(getByText(/more details/i));
  const title = getByRole('heading', { level: 2, name: 'Pikachu Details' });
  const summary = getByRole('heading', { level: 2, name: 'Summary' });
  const pokeInfo = getByText(data[0].summary);
  const pokeLocation = getAllByAltText('Pikachu location');
  const locationTitle = getByRole('heading', {
    level: 2, name: /Game Locations of Pikachu/i,
  });

  expect(title).toBeInTheDocument();
  expect(summary).toBeInTheDocument();
  expect(pokeInfo).toBeInTheDocument();
  expect(pokeLocation).toHaveLength(2);
  expect(pokeLocation[0].src).toMatch(data[0].foundAt[0].map);
  expect(locationTitle).toBeInTheDocument();

  userEvent.click(getByText('Pokémon favoritado?'));
  history.push('/favorites');
  const name = getByTestId('pokemon-name');

  expect(name).toHaveTextContent('Pikachu');
});
