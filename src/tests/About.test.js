import React from 'react';
// import { screen } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

test('Test 2.0', () => {
  const { getByText } = renderWithRouter(<About />);
  const info1 = getByText(/This application simulates a Pokédex/i);
  expect(info1).toBeInTheDocument();
  const info2 = getByText(/One can filter Pokémons by type/i);
  expect(info2).toBeInTheDocument();
});
test('Test 2.1', () => {
  const { getByText } = renderWithRouter(<About />);
  const aboutText = getByText(/About Pokédex/i);
  expect(aboutText).toBeInTheDocument();
});
test('Test 2.2', () => {
  const { getByRole } = renderWithRouter(<About />);
  const image = getByRole('img');
  expect(image).toBeInTheDocument();
  const path = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(image.src).toBe(path);
});
