import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa os pokemons', () => {
  it('entra em detalhe - confere o icone de estrela , e checkbox favorite', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const detalhesLink = screen.getByText('More details');

    fireEvent.click(detalhesLink);

    const pokemonFav = screen.getByLabelText('Pokémon favoritado?');

    fireEvent.click(pokemonFav);

    const starIcon = screen.getByAltText(`${pokemonName.textContent}`);

    expect(starIcon.getAttribute('src')).toBe('/star-icon.svg');
  });
});
