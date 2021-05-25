import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

test('page renders a h2 heading with text `Encountered pokémons`', () => {
  const { getByRole, history } = renderWithRouter(<App />);
  history.push('/');
  const encounteredPkms = getByRole('heading', {
    name: 'Encountered pokémons',
    level: 2,
  });
  expect(encounteredPkms).toBeInTheDocument();
});


