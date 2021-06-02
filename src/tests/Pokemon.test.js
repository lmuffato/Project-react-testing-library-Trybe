import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokeType = 'pokemon-type';
const pokeName = 'pokemon-name';

function dragonClick() {
  const dragonButton = screen.getByRole('button', { name: /dragon/i });
  userEvent.click(dragonButton);
}
describe('Testa os componentes do cardPokemon', () => {
  test('Testa se o nome e tipo correto do pokemon aparece na tela', () => {
    renderWithRouter(<App />);
    dragonClick();
    const pokemonType = screen.getByTestId(pokeType);
    expect(pokemonType.innerHTML).toBe('Dragon');
    const pokemonName = screen.getByTestId(pokeName);
    expect(pokemonName.innerHTML).toBe('Dragonair');
  });
});
