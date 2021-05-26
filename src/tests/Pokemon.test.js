import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test Pokemon card', () => {
  it('Test if card is rendered', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemon-type');
    const pokemonWeight = getByTestId('pokemon-weight');
    const nextBtn = getByRole('button', { name: /Próximo Pokémon/i });
    expect(pokemonName.textContent).toMatch(/Pikachu/i);
    expect(pokemonType.textContent).toMatch(/Electric/i);
    expect(pokemonWeight.textContent).toMatch(/\d+ kg/i);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    expect(pokemonName.textContent).toMatch(/Alakazam/i);
    expect(pokemonType.textContent).toMatch(/Psychic/i);
    expect(pokemonWeight.textContent).toMatch(/\d+ kg/i);
  });
});
