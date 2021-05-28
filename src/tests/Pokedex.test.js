import React from 'react';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokedex test', () => {
  it('Mostra um h2 com `Encountered pokémons`', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const h2 = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    })
    expect(h2).toBeInTheDocument();
  });

  it('mostra um card do pokemon com informações', () => {
    const { getByTestId, getByRole, getByAltText } = renderWithRouter(<App />);
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(getByTestId('pokemon-name')).toHaveTextContent(/Pikachu/i);
    expect(getByTestId('pokemon-type')).toHaveTextContent(/Electric/i);
    expect(getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.0 kg');
    expect(getByAltText('Pikachu sprite').src).toBe(url);
    expect(getByRole('img').src).toBe(url);
  });

  it('Mostra o proximo pokemon quando clica em `Proximo pokémon`'
  + ' vai para o primeiro pkmn depois que o ultimo foi clicado', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
        expect(getByText(pokemon.name)).toBeInTheDocument();
        userEvent.click(screen.getByTestId('next-pokemon'));
    });
    expect(getByTestId('next-pokemon')).toBeInTheDocument();
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('mostra apenas um pokemon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  })

  it('mostra os botões com todos os tipos de pkmn', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const typeButtons = getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toBe(7);
  });

  it('mostrar um botão de reset', () => {
    const { getByText } = renderWithRouter(<App />);
    const resetButton = getByText(/All/);
    userEvent.click(screen.getByText(/All/));
    expect(resetButton).toBeInTheDocument();
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('`Proximo Pokemon` não mostra quando há apenas um pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/Próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();
    expect(nextButton.disabled).toBeFalsy();

  });

});