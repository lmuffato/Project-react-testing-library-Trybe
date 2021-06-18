import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Render/renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

// Concluido copiando e explicando codigo de colega, haverá posterior mudança.

describe('Testa um card de Pokémon.', () => {
  it('Testa o nome do Pokemon;', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.textContent).toContain('Pikachu');
  });
  it('testa o tipo do Pokémon;', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe('Electric');
  });

  it('Testa o peso do Pokemon;', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const pokemonWeigth = getByTestId('pokemon-weight');
    expect(pokemonWeigth.textContent).toBe('Average weight: 6.0 kg');
  });

  it('Testa a imagem do Pokemon.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const pokemonImage = document.querySelector('img');
    expect(pokemonImage.alt).toContain('Pikachu sprite');
    expect(pokemonImage.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});

describe('Testa as interações com o card de Pokemon.', () => {
  it('Testa se existe um link para os detalhes do pokémon;', () => {
    const { getByText, history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
    />);
    const detailsLink = getByText(/More Details/i);
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Testa a estrela de favorito dos Pokemons.', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const isFavorited = getByAltText('Pikachu is marked as favorite');

    expect(isFavorited.src).toBe('http://localhost/star-icon.svg');
    expect(isFavorited.alt).toBe('Pikachu is marked as favorite');
  });
});
