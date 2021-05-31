import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente "Pokedex".', () => {
  const pokeIdCardName = 'pokemon-name';

  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByRole } = renderWithRouter(<App />);

    const pokedexTitle = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(pokedexTitle).toBeInTheDocument();
  });

  it(`Teste se é exibido o próximo Pokémon da lista 
    quando o botão Próximo pokémon é clicado.`, () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    const nextPokemon = getByText('Próximo pokémon');

    userEvent.click(nextPokemon);
    let newPokemon = getByTestId(pokeIdCardName);
    expect(newPokemon.textContent).toBe('Charmander');

    userEvent.click(nextPokemon);
    newPokemon = getByTestId(pokeIdCardName);
    expect(newPokemon.textContent).toBe('Caterpie');

    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    newPokemon = getByTestId(pokeIdCardName);
    expect(newPokemon.textContent).toBe('Pikachu');

    expect(nextPokemon).toBeInTheDocument();
  });
});
