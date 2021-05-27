import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o bt é clicado.', () => {
    renderWithRouter(<App />);
    const btnType = screen.getAllByRole('button');
    const psychicType = btnType[5];
    userEvent.click(psychicType);

    const pokemonName = screen.getByTestId('pokemon-name');
    const alakazam = pokemonName;
    expect(alakazam.innerHTML).toBe('Alakazam');

    const btnNextPokemon = screen.getByTestId('next-pokemon');
    userEvent.click(btnNextPokemon);

    const mew = pokemonName;
    expect(mew.innerHTML).toBe('Mew');
    userEvent.click(btnNextPokemon);

    const alakazamAgain = pokemonName;
    expect(alakazamAgain.innerHTML).toBe('Alakazam');
  });
});
