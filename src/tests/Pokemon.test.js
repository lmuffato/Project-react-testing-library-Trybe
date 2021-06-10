import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('Teste se é renderizado um card do pokémon', () => {
  const { type, name, averageWeight: { value, measurementUnit } } = pokemons[0];
  const { getByTestId, getByRole } = renderWithRouter(<App />);
  const getNameId = getByTestId('pokemon-name');
  expect(getNameId.textContent).toBe(`${name}`);
  const getTypeId = getByTestId('pokemon-type');
  expect(getTypeId.textContent).toBe(`${type}`);
  const getAverage = getByTestId('pokemon-weight');
  expect(getAverage.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
  const getImage = getByRole('img');
  expect(getImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png', 'alt', `${name} sprite`);
  expect(getImage).toHaveAttribute('alt', `${name} sprite`);
});

test('Teste se é feito  o redirecionamento da página de details do pokemon', () => {
  const { id, name } = pokemons[0];
  const { getByLabelText, getByAltText, getByText, history } = renderWithRouter(<App />);
  const getMoreDetails = getByText('More details');
  fireEvent.click(getMoreDetails);
  expect(getMoreDetails).toHaveAttribute('href', `/pokemons/${id}`);
  const getSumary = getByText('Summary');
  expect(getSumary).toBeInTheDocument();
  expect(history.location.pathname).toBe(`/pokemons/${id}`);
  const getCheckFavorite = getByLabelText('Pokémon favoritado?');
  fireEvent.click(getCheckFavorite);
  const getImageStar = getByAltText(`${name} is marked as favorite`);
  expect(getImageStar).toBeInTheDocument();
  expect(getImageStar).toHaveAttribute('src', '/star-icon.svg');
});
