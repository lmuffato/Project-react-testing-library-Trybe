import React from 'react';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa os pokemons', () => {
  it('testa card - nome - tipo - peso - detalhes - imagem', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonKG = screen.getByTestId('pokemon-weight');
    const pokemonDetails = screen.getByText('More details');
    const pokemonImg = screen.getByAltText(`${pokemonName.textContent} sprite`);

    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonKG.textContent).toBe('Average weight: 6.0 kg');
    expect(pokemonDetails.getAttribute('href')).toBe('/pokemons/25');
    expect(pokemonImg.getAttribute('src')).toBe(
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  it('entra em detalhe - confere o icone de estrela , e checkbox favorite', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const detalhesLink = screen.getByText('More details');

    fireEvent.click(detalhesLink);

    const pokemonFav = screen.getByLabelText('Pokémon favoritado?');

    fireEvent.click(pokemonFav);

    const starIcon = screen.getByAltText(`${pokemonName.textContent} is marked as favorite`);

    expect(starIcon.getAttribute('src')).toBe('/star-icon.svg');
  });
});
