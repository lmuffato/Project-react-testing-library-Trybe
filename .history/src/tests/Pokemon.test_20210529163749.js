import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('test <Pokemon.js />', () => {
  it('test the rendering of a certain pokémon', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon/>
    );
    const namePoke = getByText('Charmander');
    expect(namePoke).toBeInTheDocument(); 
    const typePoke = getByText('Fire');
    expect(typePoke).toBeInTheDocument();
    const weightPoke = getByText(/average weight: 8.5 kg/i);
    expect(weightPoke).toBeInTheDocument();
});
