import React from 'react';
// import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('', () => {});

test('', () => {});

test('testa se pode favoritar um pokémon', () => {
const { getByRole, getByAltText, getByLabelText } = renderWithRouter(<App />);
  const selectPikachu = getByRole('button', {
    name: 'Electric',
  });
  userEvent.click(selectPikachu);
  const selectDetails = getByRole('link', {
    name: 'More details',
  });
  userEvent.click(selectDetails);
  const checkbox = getByRole('checkbox');
  const labelFavorite = getByLabelText('Pokémon favoritado?');
  userEvent.click(labelFavorite);
  const sprite = getByAltText('Pikachu is marked as favorite');
  expect(labelFavorite).toBeInTheDocument();
  expect(checkbox).toBeInTheDocument();
});
