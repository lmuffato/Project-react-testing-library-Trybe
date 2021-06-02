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
  test('O peso médio pokémon deve ser exibido com um texto no formato certo', () => {
    renderWithRouter(<App />);
    dragonClick();
    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight.innerHTML).toBe('Average weight: 16.5 kg');
  });
  test('A imagem do Pokémon deve ser exibida.', () => {
    renderWithRouter(<App />);
    dragonClick();
    const pokemonName = screen.getByTestId(pokeName).innerHTML;
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png');
    expect(image).toHaveAttribute('alt', `${pokemonName} sprite`);
  });
});
